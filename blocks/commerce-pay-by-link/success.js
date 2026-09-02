/* eslint-disable import/no-unresolved */

import { initializers } from '@dropins/tools/initializer.js';
import * as orderApi from '@dropins/storefront-order/api.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';
import OrderHeader from '@dropins/storefront-order/containers/OrderHeader.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';
import { fetchPlaceholders, rootLink } from '../../scripts/commerce.js';

export default async function renderPayByLinkSuccess(block, orderData) {
  const confirmation = document.createElement('div');
  const main = document.createElement('div');
  const aside = document.createElement('aside');
  const header = document.createElement('div');
  const status = document.createElement('div');
  const customer = document.createElement('div');
  const costs = document.createElement('div');
  const products = document.createElement('div');
  const continueLink = document.createElement('a');

  confirmation.className = 'commerce-pay-by-link__confirmation';
  main.className = 'commerce-pay-by-link__confirmation-main';
  aside.className = 'commerce-pay-by-link__confirmation-aside';
  continueLink.className = 'button primary commerce-pay-by-link__continue';
  continueLink.href = rootLink('/');
  continueLink.textContent = 'Continue shopping';
  main.append(header, status, customer);
  aside.append(costs, products, continueLink);
  confirmation.append(main, aside);
  block.replaceChildren(confirmation);

  const labels = await fetchPlaceholders();
  await initializers.mountImmediately(orderApi.initialize, {
    langDefinitions: { default: { ...labels } },
    orderData,
  });

  await Promise.all([
    OrderProvider.render(OrderHeader, { orderData })(header),
    OrderProvider.render(OrderStatus, {
      slots: { OrderActions: () => null },
    })(status),
    OrderProvider.render(CustomerDetails)(customer),
    OrderProvider.render(OrderCostSummary)(costs),
    OrderProvider.render(OrderProductList)(products),
  ]);
}
