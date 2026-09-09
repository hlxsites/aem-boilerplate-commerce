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
import { events } from '@dropins/tools/event-bus.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { h } from '@dropins/tools/preact.js';
import {
  InLineAlert,
  Icon,
  Button,
  ProgressSpinner,
  provider as UI,
} from '@dropins/tools/components.js';
import { render as negotiableQuoteRenderer } from '@dropins/storefront-quote-management/render.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';

// Containers
import { Addresses } from '@dropins/storefront-account/containers/Addresses.js';
import { ManageNegotiableQuote } from '@dropins/storefront-quote-management/containers/ManageNegotiableQuote.js';
import { QuotesListTable } from '@dropins/storefront-quote-management/containers/QuotesListTable.js';

// API
import { setShippingAddress } from '@dropins/storefront-quote-management/api.js';
import { getCustomerData } from '@dropins/storefront-auth/api.js';
import {
  createCustomerAddress,
  getCompanyAddressBook,
  getCustomerAddress,
} from '@dropins/storefront-account/api.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Initialize
import '../../scripts/initializers/quote-management.js';
import '../../scripts/initializers/company.js';
import { isCompanyAddressBookEnabled } from '../../scripts/initializers/account.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
  fetchPlaceholders,
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
// enabled, the customer's own otherwise. The quote needs the list itself, not
// just a preselection — the container reports only what it picked, and falls
// back to the first entry whether or not it is a default or the address the
// quote actually holds.
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
    // An unreachable address book must not block the quote. With no list
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
      message: 'You need to be associated with a company to access quote management. Please contact your administrator.',
    };
  }

  return { hasPermission: true, message: '' };
};

/**
 * Get the current user email
 * @returns {Promise<string>} The current user email
 */
async function getCurrentUserEmail() {
  const token = getUserTokenCookie();
  if (!token) return null;

  try {
    const customer = await getCustomerData(token);
    return customer.email;
  } catch (error) {
    console.error('Error fetching customer email:', error);
    return null;
  }
}

/**
 * Decorate the block
 * @param {HTMLElement} block - The block to decorate
 */
export default async function decorate(block) {
  const isB2BEnabled = getConfigValue('commerce-b2b-enabled');

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  // Current user email
  let currentUserEmail = null;

  const permissionCheck = await checkPermissions();
  if (!permissionCheck.hasPermission) {
    // Show warning banner instead of redirecting
    UI.render(InLineAlert, {
      type: 'warning',
      variant: 'primary',
      heading: 'Access Restricted',
      description: permissionCheck.message,
      icon: h(Icon, { source: 'Warning' }),
    })(block);
    return;
  }

  const placeholders = await fetchPlaceholders();

  // Get the quote id from the url
  const quoteId = new URLSearchParams(window.location.search).get('quoteid');

  // Checkout button
  const checkoutButtonContainer = document.createElement('div');
  checkoutButtonContainer.classList.add('negotiable-quote__checkout-button-container');

  // Create a container for the address error
  const addressErrorContainer = document.createElement('div');
  addressErrorContainer.classList.add('negotiable-quote__address-error-container');
  addressErrorContainer.setAttribute('hidden', true);

  // Function for rendering or re-rendering the checkout button
  const renderCheckoutButton = (_context, checkoutEnabled = false) => {
    if (!quoteId) return;

    UI.render(Button, {
      children: placeholders?.Cart?.PriceSummary?.checkout,
      disabled: !checkoutEnabled,
      onClick: () => {
        window.location.href = `/b2b/quote-checkout?quoteId=${quoteId}`;
      },
    })(checkoutButtonContainer);
  };

  if (quoteId) {
    block.classList.add('negotiable-quote__manage');
    block.setAttribute('data-quote-view', 'manage');
    await negotiableQuoteRenderer.render(ManageNegotiableQuote, {
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
      onActionsButtonClick: (action) => {
        switch (action) {
          case 'print':
            window.print();
            break;
          default:
            break;
        }
      },
      slots: {
        Footer: async (ctx) => {
          ctx.appendChild(checkoutButtonContainer);

          // Get the current user email
          currentUserEmail = await getCurrentUserEmail();

          // Checkout button is enabled if the quote can be checked out
          // and the current user email is the same as the quote email
          const enabled = ctx.quoteData?.canCheckout
            && currentUserEmail === ctx.quoteData?.email;

          // Initial render
          renderCheckoutButton(ctx, enabled);

          // Re-render on state changes
          ctx.onChange((next) => {
            // Checkout button is enabled if the quote can be checked out
            // and the current user email is the same as the quote email
            const nextEnabled = next.quoteData?.canCheckout
              && currentUserEmail === next.quoteData?.email;

            renderCheckoutButton(next, nextEnabled);
          });
        },
        ShippingInformation: (ctx) => {
          // Append the address error container to the shipping information container
          ctx.appendChild(addressErrorContainer);

          const shippingInformation = document.createElement('div');
          shippingInformation.classList.add('negotiable-quote__select-shipping-information');
          ctx.appendChild(shippingInformation);

          const progressSpinner = document.createElement('div');
          progressSpinner.classList.add('negotiable-quote__progress-spinner-container');
          progressSpinner.setAttribute('hidden', true);
          ctx.appendChild(progressSpinner);

          UI.render(ProgressSpinner, {
            className: 'negotiable-quote__progress-spinner',
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
          // on that operation. The quote does the same. Creating one instead left
          // a customer address the backend then refused as a source, once the
          // company address book was on.
          const writeTypedAddress = debounce((data) => {
            setShippingAddress({
              quoteUid: quoteId,
              addressData: {
                firstname: data?.firstName,
                lastname: data?.lastName,
                company: data?.company,
                street: data?.street,
                city: data?.city,
                region: data?.region?.regionCode,
                regionId: data?.region?.regionId,
                postcode: data?.postcode,
                countryCode: data?.countryCode,
                telephone: data?.telephone,
                // The schema defaults this to true, so leaving it out saves the
                // address to the customer's book. A custom address on a quote is
                // meant to live on the quote and nowhere else.
                saveInAddressBook: false,
                // `vatId` is not part of the address input, so it travels in the
                // pass-through the transform spreads into the payload.
                additionalInput: { vat_id: data?.vatId },
              },
            }).catch(showAddressError);
          }, ADDRESS_INPUT_DEBOUNCE_TIME);

          // The container reports a selection as soon as it renders, before the
          // customer touches anything, and that report is whatever it preselected
          // rather than what the quote holds. Writing it back would replace the
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

            const { quoteData } = next;

            if (!quoteData) return;

            if (!quoteData.canSendForReview) return;

            if (quoteData.canSendForReview) {
              // The quote stores a copy of the address, so its `uid` matches
              // nothing in the address book. `companyAddressId` and
              // `customerAddressUid` say which saved address the copy came from.
              const savedAddress = quoteData.shippingAddresses?.[0];
              const savedAddressRef = savedAddress?.companyAddressId
                ?? savedAddress?.customerAddressUid;
              const addressBookEnabled = Boolean(isB2BEnabled)
                && (await isCompanyAddressBookEnabled());
              const addresses = await readSelectableAddresses(isB2BEnabled);
              // Enabling the company address book leaves a personal address the
              // quote still holds absent from the list. Restoring it then means
              // asking for an entry that is not there, and the container answers
              // with the first one, which the quote does not hold.
              const restoreRef = addresses?.some(
                (address) => matchesAddressRef(address, savedAddressRef),
              ) ? savedAddressRef : undefined;
              // A default is an opening choice, so it applies only while the
              // quote holds no address at all.
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
                className: 'negotiable-quote__shipping-information-addresses',
                selectShipping: true,
                // Only with the company address book on: there the typed address
                // is sent as it is written, so a Save button has nothing to do.
                // Without it the form keeps its buttons and its submit handler.
                hideActionFormButtons: addressBookEnabled,
                // The address the quote holds while it is still selectable, else
                // the customer's default. `0` says there is neither: nothing is
                // selected and the new-address form is offered instead.
                defaultSelectAddressId: restoreRef ?? defaultAddressRef ?? 0,
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
                  // Nothing to write when the choice is what the quote already holds.
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
                  // the customer actually caused may replace an address the quote
                  // already holds. Typing is not covered by this: it raises no
                  // change event on the radio, and it is deliberate anyway.
                  if (!customerPickedAddress && savedAddress) return;

                  const addressRef = companyAddressId
                    ? { companyAddressId }
                    : { addressId: customerAddressUid };

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  setShippingAddress({
                    quoteUid: quoteId,
                    ...addressRef,
                  }).catch(showAddressError).finally(() => {
                    progressSpinner.setAttribute('hidden', true);
                    shippingInformation.removeAttribute('hidden');
                  });
                },
                onSubmit: (event, formValid) => {
                  if (!formValid) return;

                  const formValues = getFormValues(event.target);

                  const [regionCode, regionId] = formValues.region?.split(',') || [];
                  const regionIdNumber = parseInt(regionId, 10);

                  // iterate through the object entries and combine the values of keys that have
                  // a prefix of 'street' into an array
                  const streetInputValues = Object.entries(formValues)
                    .filter(([key]) => key.startsWith('street'))
                    .map(([_, value]) => value);

                  const createCustomerAddressInput = {
                    city: formValues.city,
                    company: formValues.company,
                    countryCode: formValues.countryCode,
                    defaultBilling: !!formValues.defaultBilling || false,
                    defaultShipping: !!formValues.defaultShipping || false,
                    fax: formValues.fax,
                    firstname: formValues.firstName,
                    lastname: formValues.lastName,
                    middlename: formValues.middlename,
                    postcode: formValues.postcode,
                    prefix: formValues.prefix,
                    region: regionCode ? {
                      regionCode,
                      regionId: regionIdNumber,
                    } : undefined,
                    street: streetInputValues,
                    suffix: formValues.suffix,
                    telephone: formValues.telephone,
                    vatId: formValues.vatId,
                  };

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  createCustomerAddress(createCustomerAddressInput)
                    .then((result) => {
                      const addressUid = typeof result === 'string' ? result : result?.uid;
                      if (!addressUid) {
                        throw new Error('Address uid not returned from createCustomerAddress.');
                      }
                      return setShippingAddress({
                        quoteUid: quoteId,
                        addressId: addressUid,
                      });
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

    // On delete success: navigate back to quotes list after delay to show success banner
    const deleteListener = events.on('quote-management/negotiable-quote-deleted', ({ deletedQuoteUids }) => {
      if (deletedQuoteUids && deletedQuoteUids.length > 0) {
        // Delay redirect by 2 seconds
        setTimeout(() => {
          window.location.href = window.location.pathname;
        }, 2000);
      }
    });

    // On duplicate success: navigate to new quote after delay to show success banner
    const duplicateListener = events.on('quote-management/quote-duplicated', ({ quote }) => {
      if (quote && quote.uid) {
        // Delay redirect by 2 seconds
        setTimeout(() => {
          window.location.href = `${window.location.pathname}?quoteid=${quote.uid}`;
        }, 2000);
      }
    });

    // Clean up listeners if block is removed
    const observer = new MutationObserver(() => {
      if (!document.body.contains(block)) {
        deleteListener?.off();
        duplicateListener?.off();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    block.classList.add('negotiable-quote__list');
    block.setAttribute('data-quote-view', 'list');
    await negotiableQuoteRenderer.render(QuotesListTable, {
      onViewQuote: (id, _quoteName, _status) => {
        // Append quote id to the url to navigate to render the manage quote view
        window.location.href = `${window.location.pathname}?quoteid=${id}`;
      },
      showItemRange: true,
      showPageSizePicker: true,
      showPagination: true,
    })(block);
  }

  // On quote item removed disable checkout button
  events.on('quote-management/quote-items-removed', ({ quote }) => {
    renderCheckoutButton(quote, false);
  });

  // On quote item quantity updated disable checkout button
  events.on('quote-management/quantities-updated', ({ quote }) => {
    renderCheckoutButton(quote, false);
  });

  // On shipping address selected disable checkout button
  events.on('quote-management/shipping-address-set', ({ quote }) => {
    renderCheckoutButton(quote, false);
  });

  // On quote closed successfully disable checkout button
  events.on('quote-management/negotiable-quote-closed', (event) => {
    if (event?.resultStatus === 'success') {
      renderCheckoutButton(event, false);
    }
  });

  // Render error when quote data fails to load
  events.on('quote-management/quote-data/error', ({ error }) => {
    UI.render(InLineAlert, {
      type: 'error',
      description: `${error}`,
    })(block);
  });
}
