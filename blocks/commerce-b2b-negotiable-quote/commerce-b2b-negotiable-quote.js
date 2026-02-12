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
import { getFormValues } from '@dropins/tools/lib.js';
import { companyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import { events } from '@dropins/tools/event-bus.js';
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
import { createCustomerAddress } from '@dropins/storefront-account/api.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';

// Initialize
import '../../scripts/initializers/quote-management.js';
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/account.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
  fetchPlaceholders,
  ACCEPTED_FILE_TYPES,
} from '../../scripts/commerce.js';

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

          ctx.onChange((next) => {
            // Remove existing content from the shipping information container
            shippingInformation.innerHTML = '';

            const { quoteData } = next;

            if (!quoteData) return;

            if (!quoteData.canSendForReview) return;

            if (quoteData.canSendForReview) {
              accountRenderer.render(Addresses, {
                minifiedView: false,
                withActionsInMinifiedView: false,
                selectable: true,
                className: 'negotiable-quote__shipping-information-addresses',
                selectShipping: true,
                defaultSelectAddressId: 0,
                onAddressData: (params) => {
                  const { data, isDataValid: isValid } = params;
                  const addressUid = data?.uid;
                  if (!isValid) return;
                  if (!addressUid) return;

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  setShippingAddress({
                    quoteUid: quoteId,
                    addressId: addressUid,
                  }).finally(() => {
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
