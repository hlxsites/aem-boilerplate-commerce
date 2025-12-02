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
import {
  InLineAlert,
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

// Initialize
import '../../scripts/initializers/quote-management.js';
import '../../scripts/initializers/company.js';
import '../../scripts/initializers/account.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
  fetchPlaceholders,
} from '../../scripts/commerce.js';

/**
 * Check if the user has the necessary permissions to access the block
 */
const checkPermissions = async () => {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  }

  // Check if company functionality is enabled
  const isEnabled = await companyEnabled();
  if (!isEnabled) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  }

  // Check if customer has a company
  try {
    await getCompany();
  } catch (error) {
    // Customer doesn't have a company or error occurred
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  }
};

/**
 * Show permission warning banner
 * @param {HTMLElement} container - Container to render warning into
 * @param {string} title - Warning title
 * @param {string} message - Warning message
 */
const showPermissionWarning = (container, title, message) => {
  const warningContainer = document.createElement('div');
  warningContainer.classList.add('negotiable-quote__permission-warning');
  container.prepend(warningContainer);

  UI.render(InLineAlert, {
    type: 'warning',
    variant: 'primary',
    heading: title,
    children: message,
  })(warningContainer);
};

/**
 * Show empty state with message
 * @param {HTMLElement} container - Container to render empty state into
 * @param {string} message - Empty state message
 */
const showEmptyState = (container, message) => {
  const emptyState = document.createElement('div');
  emptyState.classList.add('negotiable-quote__empty-state');
  emptyState.textContent = message;
  container.appendChild(emptyState);
};

/**
 * Decorate the block
 * @param {HTMLElement} block - The block to decorate
 */
export default async function decorate(block) {
  console.log('[Quote Block] Starting decoration');
  
  if (!checkIsAuthenticated()) {
    console.log('[Quote Block] Not authenticated, redirecting to login');
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  const placeholders = await fetchPlaceholders();

  // IMPORTANT: Must await this to prevent race condition
  console.log('[Quote Block] Checking basic permissions (company, etc.)');
  await checkPermissions();
  console.log('[Quote Block] Basic permissions check passed');

  // Get the quote id from the url
  const quoteId = new URLSearchParams(window.location.search).get('quoteid');
  console.log('[Quote Block] Quote ID:', quoteId || 'none (list view)');

  /**
   * Map auth permissions to quote permissions
   * @param {Object} authPermissions - Raw auth permissions from auth/permissions event
   * @returns {Object} Mapped quote permissions
   */
  const mapQuotePermissions = (authPermissions) => {
    if (!authPermissions || typeof authPermissions !== 'object') {
      return { editQuote: false, requestQuote: false };
    }

    // Check for global permission
    if (authPermissions.all === true) {
      return { editQuote: true, requestQuote: true };
    }

    // Check for Magento_NegotiableQuote::all permission
    const hasAllQuotePermissions = authPermissions['Magento_NegotiableQuote::all'] === true;

    // Check for Magento_NegotiableQuote::manage permission
    const hasManagePermission = authPermissions['Magento_NegotiableQuote::manage'] === true;

    return {
      editQuote: hasAllQuotePermissions || hasManagePermission,
      requestQuote: hasAllQuotePermissions || hasManagePermission,
    };
  };

  // Track if we have necessary permissions and if we've checked them
  let hasQuotePermissions = null; // null = not checked yet, true/false = checked
  let hasRendered = false;
  let shouldRenderContainers = false;

  /**
   * Check permissions and render appropriate UI
   * @param {Object} permissions - Auth permissions object
   */
  const checkAndRenderPermissions = (permissions) => {
    console.log('[Quote Block] checkAndRenderPermissions called with:', permissions);

    if (hasRendered) {
      console.log('[Quote Block] Already rendered, skipping');
      return;
    }

    const mappedPermissions = mapQuotePermissions(permissions);
    console.log('[Quote Block] Mapped permissions:', mappedPermissions);

    const hasPermissions = !quoteId
      ? (mappedPermissions.editQuote || mappedPermissions.requestQuote)
      : mappedPermissions.editQuote;

    console.log('[Quote Block] Has access:', hasPermissions);
    hasQuotePermissions = hasPermissions;

    if (!hasPermissions) {
      // No permissions - show warning banner
      console.log('[Quote Block] NO PERMISSIONS - Showing warning banner');
      const title = 'Access Restricted';
      const message = !quoteId
        ? 'You do not have permission to view quotes. Please contact your administrator for access.'
        : 'You do not have permission to edit this quote. Please contact your administrator for access.';

      showPermissionWarning(block, title, message);
      showEmptyState(block, '');
      hasRendered = true;
      shouldRenderContainers = false;
    } else {
      console.log('[Quote Block] HAS PERMISSIONS - Will render containers');
      hasRendered = true;
      shouldRenderContainers = true;
    }
  };

  // Check initial permissions
  const initialPermissions = events.lastPayload('auth/permissions');
  console.log('[Quote Block] Initial permissions from lastPayload:', initialPermissions);

  // If auth/permissions has already been emitted, check immediately
  if (initialPermissions !== undefined) {
    checkAndRenderPermissions(initialPermissions);
    if (!shouldRenderContainers) {
      console.log('[Quote Block] No permissions, exiting early');
      return; // Exit early if no permissions
    }
    console.log('[Quote Block] Has permissions, continuing to render containers');
  } else {
    console.log('[Quote Block] Permissions not loaded yet, will wait for auth/permissions event');
  }

  // Listen for permission updates (especially for first-time load)
  const permissionsListener = events.on('auth/permissions', (authPermissions) => {
    console.log('[Quote Block] auth/permissions event received:', authPermissions);
    
    // If we haven't rendered yet (permissions came after block load), render now
    if (hasQuotePermissions === null) {
      console.log('[Quote Block] First time receiving permissions, rendering now');
      checkAndRenderPermissions(authPermissions);
      // If no permissions, the function already showed the warning and we're done
      // If has permissions, continue below to render containers
    } else {
      // Permissions changed after initial render
      console.log('[Quote Block] Permissions changed after initial render');
      const permissions = mapQuotePermissions(authPermissions);
      const currentHasPermissions = !quoteId
        ? (permissions.editQuote || permissions.requestQuote)
        : permissions.editQuote;

      // If permissions were revoked
      if (!currentHasPermissions && hasQuotePermissions) {
        console.log('[Quote Block] Permissions revoked, clearing and showing warning');
        hasQuotePermissions = false;
        hasRendered = false;
        block.innerHTML = '';
        checkAndRenderPermissions(authPermissions);
      }
    }
  }, { eager: true });

  // If permissions haven't loaded yet, wait for them before rendering
  if (hasQuotePermissions === null) {
    console.log('[Quote Block] Waiting for permissions, exiting early');
    // Exit and wait for auth/permissions event
    return;
  }
  
  console.log('[Quote Block] Proceeding to render containers');

  // Render error when quote data fails to load
  const errorListener = events.on('quote-management/quote-data/error', ({ error }) => {
    UI.render(InLineAlert, {
      type: 'error',
      description: `${error}`,
    })(block);
  });

  // Checkout button
  const checkoutButtonContainer = document.createElement('div');
  checkoutButtonContainer.classList.add('negotiable-quote__checkout-button-container');

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

  // Only render containers if we have permissions
  if (quoteId && hasQuotePermissions) {
    block.classList.add('negotiable-quote__manage');
    block.setAttribute('data-quote-view', 'manage');
    await negotiableQuoteRenderer.render(ManageNegotiableQuote, {
      slots: {
        Footer: (ctx) => {
          ctx.appendChild(checkoutButtonContainer);
          const enabled = ctx.quoteData?.canCheckout;
          renderCheckoutButton(ctx, enabled);
        },
        ShippingInformation: (ctx) => {
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
                    saveInAddressBook: formValues.saveInAddressBook,
                  };

                  // These values are not part of the standard address input
                  const additionalAddressInput = {
                    vat_id: formValues.vatId,
                  };

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);
                  setShippingAddress({
                    quoteUid: quoteId,
                    addressData: {
                      ...addressInput,
                      additionalInput: additionalAddressInput,
                    },
                  }).finally(() => {
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
        permissionsListener?.off();
        errorListener?.off();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  } else if (!quoteId && hasQuotePermissions) {
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

  // Listen for changes to the company context (e.g. when user switches companies).
  events.on('companyContext/changed', () => {
    const url = new URL(window.location.href); // Parse the current page URL
    url.searchParams.delete('quoteid'); // Remove the 'quoteid' search parameter if present
    window.history.replaceState({}, '', url.toString()); // Replace browser URL bar without reloading
    window.location.href = url.toString(); // Reload the page to show the list view
  });

  // Clean up all listeners if block is removed
  if (!quoteId) {
    const observer = new MutationObserver(() => {
      if (!document.body.contains(block)) {
        permissionsListener?.off();
        errorListener?.off();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}
