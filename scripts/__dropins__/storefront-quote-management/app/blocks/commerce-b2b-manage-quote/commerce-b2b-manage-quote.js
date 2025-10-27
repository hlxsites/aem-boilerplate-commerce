import { ManageNegotiableQuote } from '@dropins/quote-management/containers/ManageNegotiableQuote.js';
import { QuotesListTable } from '@dropins/quote-management/containers/QuotesListTable.js';
import { render as quoteProvider } from '@dropins/quote-management/render.js';

export default async function decorate(block) {
  const urlParams = new URLSearchParams(window.location.search);
  const quoteId = urlParams.get('quoteId');

  if (!quoteId) {
    block.setAttribute('data-testid', 'quote-list-table');
    // Render the quote list table
    quoteProvider.render(QuotesListTable, {
      onViewQuote: (quoteId) => {
        window.location.href = `?quoteId=${quoteId}`;
      },
    })(block);
  } else {
    block.setAttribute('data-testid', 'manage-quote');
    // Render the manage quote component
    quoteProvider.render(ManageNegotiableQuote, {})(block);
  }
}
