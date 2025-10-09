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
import { checkIsCompanyEnabled, getCompany } from '@dropins/storefront-company-management/api.js';
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  checkIsAuthenticated,
  rootLink,
  fetchPlaceholders,
} from '../../scripts/commerce.js';
import '../../scripts/initializers/quote-management.js';
import { render as negotiableQuoteRenderer } from '@dropins/storefront-quote-management/render.js';
import { ItemsQuoted } from '@dropins/storefront-quote-management/containers/ItemsQuoted.js';

import { ManageNegotiableQuote } from '@dropins/storefront-quote-management/containers/ManageNegotiableQuote.js';
import { QuotesListTable } from '@dropins/storefront-quote-management/containers/QuotesListTable.js';

// Initialize
import '../../scripts/initializers/quote-management.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  const placeholders = await fetchPlaceholders();

  checkPermissions();

  // Get the quote id from the url
  const quoteId = new URLSearchParams(window.location.search).get('quoteid');

  if (quoteId) {
    block.classList.add('negotiable-quote__manage');
    block.setAttribute('data-quote-view', 'manage');
    await negotiableQuoteRenderer.render(ManageNegotiableQuote, {
      slots: {
        QuoteContent: ctx => {
          const itemsQuoted = document.createElement('div');
          itemsQuoted.classList.add('negotiable-quote__items-quoted');

          negotiableQuoteRenderer.render(ItemsQuoted, {})(itemsQuoted);

          ctx.replaceWith(itemsQuoted);
        }
      }
    })(block);

  }
  else {
    block.classList.add('negotiable-quote__list');
    block.setAttribute('data-quote-view', 'list');
    await negotiableQuoteRenderer.render(QuotesListTable, {
      onViewQuote: (quoteId, quoteName, status) => {
        // temporary console log, remove this later
        // eslint-disable-next-line no-console
        console.log('View Quote clicked:', { quoteId, quoteName, status });
        // Append quote id to the url without reloading the page
        window.location.href = `${window.location.pathname}?quoteid=${quoteId}`;
      },
      showItemRange: true,
      showPageSizePicker: true,
      showPagination: true,
    })(block);
  }
}

const checkPermissions = async () => {
  // Check authentication
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  // Check if company functionality is enabled
  const companyCheck = await checkIsCompanyEnabled();
  if (!companyCheck.companyEnabled) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  // Check if customer has a company
  try {
    await getCompany();
  } catch (error) {
    // Customer doesn't have a company or error occurred
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }
};
