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
import { render as qmRenderer } from '@dropins/storefront-quote-management/render.js';
import { QuotesListTable } from '@dropins/storefront-quote-management/containers/QuotesListTable.js';
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/quote-management.js';

export default async function decorate(block) {
  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
    return;
  }

  await qmRenderer.render(QuotesListTable, {
    onViewQuote: (quoteId, quoteName, status) => {
      // temporary console log, remove this later
      // eslint-disable-next-line no-console
      console.log('View Quote clicked:', { quoteId, quoteName, status });
      // TODO: Navigate to quote details page, remove this later
      // eslint-disable-next-line no-alert
      alert(`Viewing quote: ${quoteName} (Status: ${status})`);
    },
    showItemRange: true,
    showPageSizePicker: true,
    showPagination: true,
  })(block);
}
