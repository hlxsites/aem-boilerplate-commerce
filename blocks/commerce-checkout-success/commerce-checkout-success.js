// Dropin Components
import { Button, provider as UI } from '@dropins/tools/components.js';

// Auth Dropin
import SignUp from '@dropins/storefront-auth/containers/SignUp.js';
import { render as AuthProvider } from '@dropins/storefront-auth/render.js';

// Order Dropin Modules
import * as orderApi from '@dropins/storefront-order/api.js';
import CustomerDetails from '@dropins/storefront-order/containers/CustomerDetails.js';
import OrderCostSummary from '@dropins/storefront-order/containers/OrderCostSummary.js';
import OrderHeader from '@dropins/storefront-order/containers/OrderHeader.js';
import OrderProductList from '@dropins/storefront-order/containers/OrderProductList.js';
import OrderStatus from '@dropins/storefront-order/containers/OrderStatus.js';
import ShippingStatus from '@dropins/storefront-order/containers/ShippingStatus.js';
import { render as OrderProvider } from '@dropins/storefront-order/render.js';

// Block-level
import createModal from '../modal/modal.js';

let modal;
async function showModal(content) {
  modal = await createModal([content]);
  modal.showModal();
}

export default async function decorate(block) {
  // Initializers
  import('../../scripts/initializers/order.js');

  const orderConfirmationFragment = document.createRange()
    .createContextualFragment(`
      <div class="order-confirmation">
        <div class="order-confirmation__main">
          <div class="order-confirmation__block order-confirmation__header"></div>
          <div class="order-confirmation__block order-confirmation__order-status"></div>
          <div class="order-confirmation__block order-confirmation__shipping-status"></div>
          <div class="order-confirmation__block order-confirmation__customer-details"></div>
        </div>
        <div class="order-confirmation__aside">
          <div class="order-confirmation__block order-confirmation__order-cost-summary"></div>
          <div class="order-confirmation__block order-confirmation__order-product-list"></div>
          <div class="order-confirmation__block order-confirmation__footer"></div>
        </div>
      </div>
  `);

  // Order confirmation elements
  const $orderConfirmationHeader = orderConfirmationFragment.querySelector(
    '.order-confirmation__header',
  );
  const $orderStatus = orderConfirmationFragment.querySelector(
    '.order-confirmation__order-status',
  );
  const $shippingStatus = orderConfirmationFragment.querySelector(
    '.order-confirmation__shipping-status',
  );
  const $customerDetails = orderConfirmationFragment.querySelector(
    '.order-confirmation__customer-details',
  );
  const $orderCostSummary = orderConfirmationFragment.querySelector(
    '.order-confirmation__order-cost-summary',
  );
  const $orderProductList = orderConfirmationFragment.querySelector(
    '.order-confirmation__order-product-list',
  );
  const $orderConfirmationFooter = orderConfirmationFragment.querySelector(
    '.order-confirmation__footer',
  );

  block.replaceChildren(orderConfirmationFragment);

  const handleSignUpClick = async ({
    inputsDefaultValueSet,
    addressesData,
  }) => {
    const signUpForm = document.createElement('div');
    AuthProvider.render(SignUp, {
      routeSignIn: () => '/customer/login',
      routeRedirectOnEmailConfirmationClose: () => '/customer/account',
      inputsDefaultValueSet,
      addressesData,
    })(signUpForm);

    await showModal(signUpForm);
  };

  OrderProvider.render(OrderHeader, {
    handleEmailAvailability: async (email) => {
      const { data } = await orderApi.fetchGraphQl(
        `
        query isEmailAvailable($email: String!) {
          isEmailAvailable(email: $email) {
            is_email_available
          }
        }`,
        {
          method: 'GET',
          variables: { email },
        },
      );

      return Boolean(data?.isEmailAvailable?.is_email_available);
    },
    handleSignUpClick,
  })($orderConfirmationHeader);

  OrderProvider.render(OrderStatus, { slots: { OrderActions: () => null } })(
    $orderStatus,
  );
  OrderProvider.render(ShippingStatus)($shippingStatus);
  OrderProvider.render(CustomerDetails)($customerDetails);
  OrderProvider.render(OrderCostSummary)($orderCostSummary);
  OrderProvider.render(OrderProductList)($orderProductList);

  $orderConfirmationFooter.innerHTML = `
      <div class="order-confirmation-footer__continue-button"></div>
      <div class="order-confirmation-footer__contact-support">
        <p>
          Need help?
          <a
            href="/support"
            rel="noreferrer"
            class="order-confirmation-footer__contact-support-link"
            data-testid="order-confirmation-footer__contact-support-link"
          >
            Contact us
          </a>
        </p>
      </div>
    `;

  const $orderConfirmationFooterContinueBtn = $orderConfirmationFooter.querySelector(
    '.order-confirmation-footer__continue-button',
  );

  UI.render(Button, {
    children: 'Continue shopping',
    'data-testid': 'order-confirmation-footer__continue-button',
    className: 'order-confirmation-footer__continue-button',
    size: 'medium',
    variant: 'primary',
    type: 'submit',
    href: '/',
  })($orderConfirmationFooterContinueBtn);
}
