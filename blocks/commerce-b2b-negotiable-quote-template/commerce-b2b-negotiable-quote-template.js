/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */
import { debounce, getFormValues } from '@dropins/tools/lib.js';
import { companyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import { render as negotiableQuoteRenderer } from '@dropins/storefront-quote-management/render.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { events } from '@dropins/tools/event-bus.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { h } from '@dropins/tools/preact.js';
import {
  InLineAlert,
  Icon,
  ProgressSpinner,
  provider as UI,
} from '@dropins/tools/components.js';

// Containers
import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import { QuoteTemplatesListTable } from '@dropins/storefront-quote-management/containers/QuoteTemplatesListTable.js';
import { ManageNegotiableQuoteTemplate } from '@dropins/storefront-quote-management/containers/ManageNegotiableQuoteTemplate.js';

// API
import { addQuoteTemplateShippingAddress } from '@dropins/storefront-quote-management/api.js';

// Initialize
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/quote-management.js';
import {
  getCompanyAddressBook,
  getCustomerAddress,
} from '@dropins/storefront-account/api.js';
import { isCompanyAddressBookEnabled } from '../../scripts/initializers/account.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_NEGOTIABLE_QUOTE_PATH,
  checkIsAuthenticated,
  rootLink,
  ACCEPTED_FILE_TYPES,
} from '../../scripts/commerce.js';

const ADDRESS_INPUT_DEBOUNCE_TIME = 500;

const isShippingSelectable = (address) => {
  if (address?.addressType === 'SHIPPING') return true;
  if (address?.addressType === 'BILLING') return false;

  // Untyped entries are read through their defaults, the same way the container
  // reads them: one default and not the other decides which kind it is.
  return Boolean(address?.defaultShipping) && !address?.defaultBilling;
};

// The addresses the container will offer: the company address book when it is
// enabled, the customer's own otherwise. The template needs the list itself, not
// just a preselection — the container reports only what it picked, and falls
// back to the first entry whether or not it is a default or the address the
// template actually holds.
const readSelectableAddresses = async (b2bEnabled) => {
  try {
    const useCompanyAddresses = Boolean(b2bEnabled)
      && (await isCompanyAddressBookEnabled());

    if (!useCompanyAddresses) {
      const customerAddresses = await getCustomerAddress();

      return customerAddresses;
    }

    const items = (await getCompanyAddressBook())?.addresses?.items;

    // The address book returns billing entries too, and the container drops them
    // for a shipping selection. Matching that here keeps this list to what is
    // actually on offer.
    return items?.filter(isShippingSelectable);
  } catch {
    // An unreachable address book must not block the template. With no list
    // nothing is preselected, which is the safe outcome either way.
    return undefined;
  }
};

const matchesAddressRef = (address, ref) => address?.uid === ref
  || String(address?.id ?? '') === String(ref);

/**
 * Check if the user has the necessary permissions to access the block
 * @returns {Promise<{hasPermission: boolean, message: string}>}
 */
const checkPermissions = async () => {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return { hasPermission: false, message: '' };
  }

  // Check if company functionality is enabled
  const isEnabled = await companyEnabled();
  if (!isEnabled) {
    return {
      hasPermission: false,
      message: 'B2B company functionality is not enabled for your account. Please contact your administrator for access.',
    };
  }

  // Check if customer has a company
  try {
    await getCompany();
  } catch (error) {
    // Customer doesn't have a company or error occurred
    return {
      hasPermission: false,
      message: 'You need to be associated with a company to access quote template management. Please contact your administrator.',
    };
  }

  return { hasPermission: true, message: '' };
};

/**
 * Decorate the block
 * @param {HTMLElement} block - The block to decorate
 */
export default async function decorate(block) {
  const isB2BEnabled = getConfigValue('commerce-b2b-enabled');

  // Check if user has permissions to access the block
  const permissionCheck = await checkPermissions();

  // Show warning banner if user doesn't have permissions
  if (!permissionCheck.hasPermission) {
    UI.render(InLineAlert, {
      type: 'warning',
      variant: 'primary',
      heading: 'Access Restricted',
      description: permissionCheck.message,
      icon: h(Icon, { source: 'Warning' }),
    })(block);
    return;
  }

  // Create a container for the address error
  const addressErrorContainer = document.createElement('div');
  addressErrorContainer.classList.add('negotiable-quote-template__address-error-container');
  addressErrorContainer.setAttribute('hidden', true);

  // Get the quote id from the url
  const quoteTemplateId = new URLSearchParams(window.location.search).get('quoteTemplateId');

  // On generate quote success: navigate to new quote after delay to show success banner
  const generateQuoteListener = events.on('quote-management/quote-template-generated', ({ quoteId }) => {
    if (quoteId) {
      // Delay redirect by 2 seconds
      setTimeout(() => {
        // Navigate to the negotiable quote page with the new quote ID
        window.location.href = rootLink(`${CUSTOMER_NEGOTIABLE_QUOTE_PATH}?quoteid=${quoteId}`);
      }, 2000);
    }
  });

  // Clean up listeners if block is removed
  const observer = new MutationObserver(() => {
    if (!document.body.contains(block)) {
      generateQuoteListener?.off();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  if (quoteTemplateId) {
    block.classList.add('negotiable-quote-template__details');
    block.setAttribute('data-quote-view', 'details');

    // Render the quote template details view
    await negotiableQuoteRenderer.render(ManageNegotiableQuoteTemplate, {
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
      slots: {
        ShippingInformation: (ctx) => {
          // Append the address error container to the shipping information container
          ctx.appendChild(addressErrorContainer);

          const shippingInformation = document.createElement('div');
          shippingInformation.classList.add('negotiable-quote-template__select-shipping-information');
          ctx.appendChild(shippingInformation);

          const progressSpinner = document.createElement('div');
          progressSpinner.classList.add('negotiable-quote-template__progress-spinner-container');
          progressSpinner.setAttribute('hidden', true);
          ctx.appendChild(progressSpinner);

          UI.render(ProgressSpinner, {
            className: 'negotiable-quote-template__progress-spinner',
            size: 'large',
          })(progressSpinner);

          const showAddressError = (error) => {
            addressErrorContainer.removeAttribute('hidden');
            UI.render(InLineAlert, {
              type: 'error',
              description: `${error}`,
            })(addressErrorContainer);
          };

          // Checkout never creates an address for a typed one: the values stream
          // into the operation as the customer types, and the address lives only
          // on that operation. The template does the same, and the quote beside it.
          const writeTypedAddress = debounce((data) => {
            addQuoteTemplateShippingAddress({
              templateId: quoteTemplateId,
              shippingAddress: {
                address: {
                  firstname: data?.firstName,
                  lastname: data?.lastName,
                  middlename: data?.middleName,
                  company: data?.company,
                  street: data?.street,
                  city: data?.city,
                  region: data?.region?.regionCode,
                  regionId: data?.region?.regionId,
                  postcode: data?.postcode,
                  countryCode: data?.countryCode,
                  telephone: data?.telephone,
                  fax: data?.fax,
                  prefix: data?.prefix,
                  suffix: data?.suffix,
                  vatId: data?.vatId,
                  // The schema defaults this to true, so leaving it out saves
                  // the address to the customer's book. A custom address on a
                  // template is meant to live on the template and nowhere else.
                  saveInAddressBook: false,
                },
              },
            }).catch(showAddressError);
          }, ADDRESS_INPUT_DEBOUNCE_TIME);

          // The container reports a selection as soon as it renders, before the
          // customer touches anything, and that report is whatever it preselected
          // rather than what the template holds. Writing it back would replace the
          // saved address on every page load. A real click always raises a change
          // event on the radio first, so this listener tells the two apart.
          let customerPickedAddress = false;
          shippingInformation.addEventListener('change', (event) => {
            if (event.target?.name === 'selectedShippingAddress') {
              customerPickedAddress = true;
            }
          }, true);

          ctx.onChange(async (next) => {
            // Writing the typed address brings the quote straight back through
            // here, and rebuilding would take the form apart under the customer's
            // hands — focus, text and all. The list can wait until they leave it;
            // the address shown above this container updates either way.
            if (shippingInformation.contains(document.activeElement)) return;

            // Remove existing content from the shipping information container
            shippingInformation.innerHTML = '';
            // Every re-render brings a fresh automatic report, so the flag has to
            // start over with it.
            customerPickedAddress = false;

            const { templateData } = next;

            if (!templateData) return;

            if (!templateData.canSendForReview) return;

            if (templateData.canSendForReview) {
              // The template stores a copy of the address, so its `uid` matches
              // nothing in the address book. `companyAddressId` and
              // `customerAddressUid` say which saved address the copy came from.
              const savedAddress = templateData.shippingAddresses?.[0];
              const savedAddressRef = savedAddress?.companyAddressId
                ?? savedAddress?.customerAddressUid;
              const addressBookEnabled = Boolean(isB2BEnabled)
                && (await isCompanyAddressBookEnabled());
              const addresses = await readSelectableAddresses(isB2BEnabled);
              // Enabling the company address book leaves a personal address the
              // template still holds absent from the list. Restoring it then means
              // asking for an entry that is not there, and the container answers
              // with the first one, which the template does not hold.
              const restoreRef = addresses?.some(
                (address) => matchesAddressRef(address, savedAddressRef),
              ) ? savedAddressRef : undefined;
              // A default is an opening choice, so it applies only while the
              // template holds no address at all.
              const defaultAddress = savedAddress
                ? undefined
                : addresses?.find((address) => address?.defaultShipping);
              const defaultAddressRef = defaultAddress?.id ?? defaultAddress?.uid;
              const refOf = (address) => address?.companyAddressId ?? address?.uid;
              const isSameAsSaved = (address) => {
                if (savedAddressRef) return refOf(address) === savedAddressRef;
                // A drop-in build without those references leaves comparing the
                // address itself as the only way to recognise the saved one.
                return Boolean(
                  savedAddress
                  && address?.postcode === savedAddress.postcode
                  && address?.city === savedAddress.city
                  && String(address?.street ?? '') === String(savedAddress.street ?? ''),
                );
              };

              accountRenderer.render(Addresses, {
                b2bEnabled: isB2BEnabled,
                minifiedView: false,
                withActionsInMinifiedView: false,
                selectable: true,
                className: 'negotiable-quote-template__shipping-information-addresses',
                selectShipping: true,
                // Only with the company address book on: there the typed address
                // is sent as it is written, so a Save button has nothing to do.
                // Without it the form keeps its buttons and its submit handler.
                hideActionFormButtons: addressBookEnabled,
                // The address the template holds while it is still selectable, else
                // the customer's default. `0` says there is neither: nothing is
                // selected and the new-address form is offered instead.
                defaultSelectAddressId: restoreRef ?? defaultAddressRef ?? 0,
                showShippingCheckBox: false,
                showBillingCheckBox: false,
                onAddressData: (params) => {
                  const { data, isDataValid: isValid } = params;
                  // A company address arrives as `companyAddressId`, because the
                  // container moves the identifier there for the B2B flow and
                  // leaves `uid` empty. A personal address arrives as `uid`. Once
                  // the company address book is on, the backend accepts only the
                  // company reference and rejects a customer address outright.
                  const companyAddressId = data?.companyAddressId;
                  const customerAddressUid = data?.uid;

                  if (!isValid) return;
                  // Nothing to write when the choice is what the template already holds.
                  if (isSameAsSaved(data)) return;

                  // Neither reference means this is the new-address form being typed
                  // into. With the company address book on there is no Save button,
                  // so the values stream out the way checkout sends them, and the
                  // form stays on screen — no spinner here. Without the book the
                  // form still has its buttons, and onSubmit does the writing.
                  if (!companyAddressId && !customerAddressUid) {
                    if (addressBookEnabled) writeTypedAddress(data);

                    return;
                  }

                  // Past this point the report is a card from the list. The
                  // container reports one as soon as it renders, so only a report
                  // the customer actually caused may replace an address the template
                  // already holds. Typing is not covered by this: it raises no
                  // change event on the radio, and it is deliberate anyway.
                  if (!customerPickedAddress && savedAddress) return;

                  const addressRef = companyAddressId
                    ? { companyAddressId }
                    : { customerAddressUid };

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  addQuoteTemplateShippingAddress({
                    templateId: quoteTemplateId,
                    shippingAddress: addressRef,
                  }).catch(showAddressError).finally(() => {
                    progressSpinner.setAttribute('hidden', true);
                    shippingInformation.removeAttribute('hidden');
                  });
                },
                onSubmit: (event, formValid) => {
                  if (!formValid) return;

                  const formValues = getFormValues(event.target);

                  const [regionCode, _regionId] = formValues.region?.split(',') || [];

                  // iterate through the object entries and combine the values of keys that have
                  // a prefix of 'street' into an array
                  const streetInputValues = Object.entries(formValues)
                    .filter(([key]) => key.startsWith('street'))
                    .map(([_, value]) => value);

                  const addressInput = {
                    firstname: formValues.firstName,
                    lastname: formValues.lastName,
                    company: formValues.company,
                    street: streetInputValues,
                    city: formValues.city,
                    region: regionCode,
                    postcode: formValues.postcode,
                    countryCode: formValues.countryCode,
                    telephone: formValues.telephone,
                  };

                  // These values are not part of the standard address input
                  const additionalAddressInput = {
                    vat_id: formValues.vatId,
                  };

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  addQuoteTemplateShippingAddress({
                    templateId: quoteTemplateId,
                    shippingAddress: {
                      address: {
                        ...addressInput,
                        additionalInput: additionalAddressInput,
                      },
                      customerNotes: formValues.customerNotes,
                    },
                  })
                    .catch((error) => {
                      addressErrorContainer.removeAttribute('hidden');
                      UI.render(InLineAlert, {
                        type: 'error',
                        description: `${error}`,
                      })(addressErrorContainer);
                    })
                    .finally(() => {
                      progressSpinner.setAttribute('hidden', true);
                      shippingInformation.removeAttribute('hidden');
                    });
                },
              })(shippingInformation);
            }
          });
        },
      },
    })(block);
  } else {
    // Render the quote templates list view
    block.classList.add('negotiable-quote-template__list');
    block.setAttribute('data-quote-view', 'list');

    await negotiableQuoteRenderer.render(QuoteTemplatesListTable, {
      // Append quote template id to the url to navigate to render the details view
      onViewQuoteTemplate: (id) => {
        window.location.href = `${window.location.pathname}?quoteTemplateId=${id}`;
      },
      pageSize: 10,
      showItemRange: true,
      showPageSizePicker: true,
      showPagination: true,
    })(block);
  }

  // Render error when quote data fails to load
  events.on('quote-management/quote-data/error', ({ error }) => {
    UI.render(InLineAlert, {
      type: 'error',
      description: `${error}`,
    })(block);
  });
}
