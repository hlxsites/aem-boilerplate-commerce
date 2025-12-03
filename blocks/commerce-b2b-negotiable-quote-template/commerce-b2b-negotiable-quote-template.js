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
import { render as negotiableQuoteRenderer } from '@dropins/storefront-quote-management/render.js';
import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { events } from '@dropins/tools/event-bus.js';
import {
  InLineAlert,
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
import '../../scripts/initializers/account.js';

// Commerce
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

/**
 * Check if the user has the necessary permissions to access the block
 */
const checkPermissions = async () => {
  // Check authentication
  if (!checkIsAuthenticated()) {
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] Not authenticated, redirecting');
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return false;
  }

  // Check if company functionality is enabled
  const isEnabled = await companyEnabled();
  // eslint-disable-next-line no-console
  console.log('[Quote Template Block] Company enabled:', isEnabled);
  if (!isEnabled) {
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] Company NOT enabled, redirecting');
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return false;
  }

  // Check if customer has a company
  try {
    const company = await getCompany();
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] User has company:', company);
  } catch (error) {
    // Customer doesn't have a company or error occurred
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] User does NOT have company, redirecting. Error:', error);
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return false;
  }

  return true;
};

/**
 * Show permission warning banner
 * @param {HTMLElement} container - Container to render warning into
 * @param {string} title - Warning title
 * @param {string} message - Warning message
 */
const showPermissionWarning = (container, title, message) => {
  const warningContainer = document.createElement('div');
  warningContainer.classList.add('negotiable-quote-template__permission-warning');
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
  emptyState.classList.add('negotiable-quote-template__empty-state');
  emptyState.textContent = message;
  container.appendChild(emptyState);
};

/**
 * Decorate the block
 * @param {HTMLElement} block - The block to decorate
 */
export default async function decorate(block) {
  // eslint-disable-next-line no-console
  console.log('[Quote Template Block] Starting decoration');

  // Check if user has permissions to access the block
  const hasPermissions = await checkPermissions();
  // eslint-disable-next-line no-console
  console.log('[Quote Template Block] Basic permissions check result:', hasPermissions);

  // Return early if user doesn't have permissions
  if (!hasPermissions) {
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] No basic permissions, exiting');
    return;
  }

  // Get the quote id from the url
  const quoteTemplateId = new URLSearchParams(window.location.search).get('quoteTemplateId');
  // eslint-disable-next-line no-console
  console.log('[Quote Template Block] Template ID:', quoteTemplateId || 'none (list view)');

  /**
   * Map auth permissions to quote template permissions
   * @param {Object} authPermissions - Raw auth permissions from auth/permissions event
   * @returns {Object} Mapped quote template permissions
   */
  const mapQuoteTemplatePermissions = (authPermissions) => {
    if (!authPermissions || typeof authPermissions !== 'object') {
      return { viewQuoteTemplates: false, manageQuoteTemplates: false };
    }

    // Check for global permission
    if (authPermissions.all === true) {
      return { viewQuoteTemplates: true, manageQuoteTemplates: true };
    }

    // Check for Magento_NegotiableQuoteTemplate::all permission
    const hasAllTemplatePermissions = authPermissions['Magento_NegotiableQuoteTemplate::all'] === true;

    return {
      viewQuoteTemplates: hasAllTemplatePermissions
        || authPermissions['Magento_NegotiableQuoteTemplate::view_template'] === true,
      manageQuoteTemplates: hasAllTemplatePermissions
        || authPermissions['Magento_NegotiableQuoteTemplate::manage'] === true,
    };
  };

  // Track if we have necessary permissions and if we've checked them
  let hasQuoteTemplatePermissions = null; // null = not checked yet, true/false = checked
  let hasRendered = false;
  let shouldRenderContainers = false;

  /**
   * Check permissions and render appropriate UI
   * @param {Object} permissions - Auth permissions object
   */
  const checkAndRenderPermissions = (permissions) => {
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] checkAndRenderPermissions called with:', permissions);

    if (hasRendered) {
      // eslint-disable-next-line no-console
      console.log('[Quote Template Block] Already rendered, skipping');
      return;
    }

    const mappedPermissions = mapQuoteTemplatePermissions(permissions);
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] Mapped permissions:', mappedPermissions);

    const hasAccess = !quoteTemplateId
      ? (mappedPermissions.viewQuoteTemplates || mappedPermissions.manageQuoteTemplates)
      : mappedPermissions.manageQuoteTemplates;

    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] Has access:', hasAccess);
    hasQuoteTemplatePermissions = hasAccess;

    if (!hasAccess) {
      // No permissions - show warning banner
      // eslint-disable-next-line no-console
      console.log('[Quote Template Block] NO PERMISSIONS - Showing warning banner');
      const title = 'Access Restricted';
      const message = !quoteTemplateId
        ? 'You do not have permission to view quote templates. Please contact your administrator for access.'
        : 'You do not have permission to edit this quote template. Please contact your administrator for access.';

      showPermissionWarning(block, title, message);
      showEmptyState(block, '');
      hasRendered = true;
      shouldRenderContainers = false;
    } else {
      // eslint-disable-next-line no-console
      console.log('[Quote Template Block] HAS PERMISSIONS - Will render containers');
      hasRendered = true;
      shouldRenderContainers = true;
    }
  };

  // Check initial permissions
  const initialPermissions = events.lastPayload('auth/permissions');
  // eslint-disable-next-line no-console
  console.log('[Quote Template Block] Initial permissions from lastPayload:', initialPermissions);

  // If auth/permissions has already been emitted, check immediately
  if (initialPermissions !== undefined) {
    checkAndRenderPermissions(initialPermissions);
    if (!shouldRenderContainers) {
      // eslint-disable-next-line no-console
      console.log('[Quote Template Block] No permissions, exiting early');
      return; // Exit early if no permissions
    }
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] Has permissions, continuing');
  } else {
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] Permissions not loaded yet, waiting');
  }

  // Listen for permission updates (especially for first-time load)
  const permissionsListener = events.on('auth/permissions', (authPermissions) => {
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] auth/permissions event received:', authPermissions);

    // If we haven't rendered yet (permissions came after block load), render now
    if (hasQuoteTemplatePermissions === null) {
      // eslint-disable-next-line no-console
      console.log('[Quote Template Block] First time receiving permissions, rendering now');
      checkAndRenderPermissions(authPermissions);
      // If no permissions, the function already showed the warning and we're done
      // If has permissions, continue below to render containers
    } else {
      // Permissions changed after initial render
      // eslint-disable-next-line no-console
      console.log('[Quote Template Block] Permissions changed after initial render');
      const permissions = mapQuoteTemplatePermissions(authPermissions);
      const currentHasPermissions = !quoteTemplateId
        ? (permissions.viewQuoteTemplates || permissions.manageQuoteTemplates)
        : permissions.manageQuoteTemplates;

      // If permissions were revoked
      if (!currentHasPermissions && hasQuoteTemplatePermissions) {
        // eslint-disable-next-line no-console
        console.log('[Quote Template Block] Permissions revoked, showing warning');
        hasQuoteTemplatePermissions = false;
        hasRendered = false;
        block.innerHTML = '';
        checkAndRenderPermissions(authPermissions);
      }
    }
  }, { eager: true });

  // If permissions haven't loaded yet, wait for them before rendering
  if (hasQuoteTemplatePermissions === null) {
    // eslint-disable-next-line no-console
    console.log('[Quote Template Block] Waiting for permissions, exiting early');
    // Exit and wait for auth/permissions event
    return;
  }

  // eslint-disable-next-line no-console
  console.log('[Quote Template Block] Proceeding to render containers');

  // Only render containers if we have permissions
  if (quoteTemplateId && hasQuoteTemplatePermissions) {
    block.classList.add('negotiable-quote-template__details');
    block.setAttribute('data-quote-view', 'details');

    // Render the quote template details view
    await negotiableQuoteRenderer.render(ManageNegotiableQuoteTemplate, {
      slots: {
        ShippingInformation: (ctx) => {
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

          ctx.onChange((next) => {
            // Remove existing content from the shipping information container
            shippingInformation.innerHTML = '';

            const { templateData } = next;

            if (!templateData) return;

            if (!templateData.canSendForReview) return;

            if (templateData.canSendForReview) {
              accountRenderer.render(Addresses, {
                minifiedView: false,
                withActionsInMinifiedView: false,
                selectable: true,
                className: 'negotiable-quote-template__shipping-information-addresses',
                selectShipping: true,
                defaultSelectAddressId: 0,
                onAddressData: (params) => {
                  const { data, isDataValid: isValid } = params;
                  const addressUid = data?.uid;
                  if (!isValid) return;
                  if (!addressUid) return;

                  progressSpinner.removeAttribute('hidden');
                  shippingInformation.setAttribute('hidden', true);

                  addQuoteTemplateShippingAddress({
                    templateId: quoteTemplateId,
                    shippingAddress: {
                      customerAddressUid: addressUid,
                    },
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
                  addQuoteTemplateShippingAddress({
                    templateId: quoteTemplateId,
                    shippingAddress: {
                      address: {
                        ...addressInput,
                        additionalInput: additionalAddressInput,
                      },
                      customerNotes: formValues.customerNotes,
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
  } else if (!quoteTemplateId && hasQuoteTemplatePermissions) {
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
  const errorListener = events.on('quote-management/quote-data/error', ({ error }) => {
    UI.render(InLineAlert, {
      type: 'error',
      description: `${error}`,
    })(block);
  });

  // Listen for changes to the company context (e.g. when user switches companies).
  const companyContextListener = events.on('companyContext/changed', () => {
    const url = new URL(window.location.href); // Parse the current page URL
    url.searchParams.delete('quoteTemplateId'); // Remove the 'quoteTemplateId' search parameter if present
    window.history.replaceState({}, '', url.toString()); // Replace browser URL bar without reloading
    window.location.href = url.toString(); // Reload the page to show the list view
  });

  // Clean up listeners if block is removed
  const observer = new MutationObserver(() => {
    if (!document.body.contains(block)) {
      permissionsListener?.off();
      errorListener?.off();
      companyContextListener?.off();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
