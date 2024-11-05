/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { events } from '@dropins/tools/event-bus.js';
import { Header, provider as uiProvider } from '@dropins/tools/components.js';
import { CUSTOMER_RETURN_DETAILS_PATH, CUSTOMER_RETURNS_PATH } from '../../scripts/constants.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

// TODO - Will be refactored after https://jira.corp.adobe.com/browse/USF-1393 | https://atwix.atlassian.net/browse/EDS-426
// Initialize
import '../../scripts/initializers/order.js';

export default async function decorate(block) {
  block.innerHTML = '';

  const headerContainer = document.createElement('div');
  await uiProvider.render(Header, { title: 'Return' })(headerContainer);

  if (window.location.href.includes(CUSTOMER_RETURN_DETAILS_PATH)) {
    const placeholders = await fetchPlaceholders();

    const link = document.createElement('a');

    link.innerText = placeholders.orderReturnDetailsBack;
    link.href = CUSTOMER_RETURNS_PATH;
    link.classList.add('returns-list-header');

    block.appendChild(link);
  }

  block.appendChild(headerContainer);

  // TODO - Will be refactored after https://jira.corp.adobe.com/browse/USF-1393 | https://atwix.atlassian.net/browse/EDS-426
  events.on('order/data', (orderData) => {
    const urlParams = new URLSearchParams(window.location.search);
    const returnNumber = urlParams.get('returnRef');
    const returnData = orderData.returns.find((item) => item.returnNumber === returnNumber);
    uiProvider.render(Header, { title: `Return ${returnData.returnNumber}` })(headerContainer);
  }, { eager: true });
}
