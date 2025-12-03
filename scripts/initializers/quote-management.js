import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-quote-management/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';
import { initializeDropin } from './index.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/quote-management.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Get quote ID from URL
  const url = new URL(window.location.href);
  const quoteId = url.searchParams.get('quoteid') || url.searchParams.get('quoteId');
  const quoteTemplateId = url.searchParams.get('quoteTemplateId') || url.searchParams.get('quoteTemplateId');

  // Map auth/permissions to quote-management specific permissions
  events.on('auth/permissions', (authPermissions) => {
    if (!authPermissions || typeof authPermissions !== 'object') {
      events.emit('quote-management/permissions', {
        editQuote: false,
        requestQuote: false,
        viewQuoteTemplates: false,
        manageQuoteTemplates: false,
      });
      return;
    }

    // Check for global admin permission
    if (authPermissions.all === true) {
      events.emit('quote-management/permissions', {
        editQuote: true,
        requestQuote: true,
        viewQuoteTemplates: true,
        manageQuoteTemplates: true,
      });
      return;
    }

    // Map specific permissions
    const hasAllQuotePermissions = authPermissions['Magento_NegotiableQuote::all'] === true;
    const hasManageQuote = authPermissions['Magento_NegotiableQuote::manage'] === true;
    const hasAllTemplatePermissions = authPermissions['Magento_NegotiableQuoteTemplate::all'] === true;
    const hasManageTemplate = authPermissions['Magento_NegotiableQuoteTemplate::manage'] === true;
    const hasViewTemplate = authPermissions['Magento_NegotiableQuoteTemplate::view_template'] === true;

    events.emit('quote-management/permissions', {
      editQuote: hasAllQuotePermissions || hasManageQuote,
      requestQuote: hasAllQuotePermissions || hasManageQuote,
      viewQuoteTemplates: hasAllTemplatePermissions || hasViewTemplate || hasManageTemplate,
      manageQuoteTemplates: hasAllTemplatePermissions || hasManageTemplate,
    });
  }, { eager: true });

  // Initialize quote management
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    quoteId,
    quoteTemplateId,
  });
})();
