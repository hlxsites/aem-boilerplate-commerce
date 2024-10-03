// Checkout Dropin Modules
import PaymentMethods from '@dropins/storefront-checkout/containers/PaymentMethods.js';
import { render as provider } from '@dropins/storefront-checkout/render.js';

/*
 * Render Container
 */
export default async function decorate(block) {
  block.classList.add('checkout__payment-methods');

  return provider.render(PaymentMethods, {
    // slots: {
    //   Handlers: {
    //     checkmo: (_ctx) => {
    //       const $content = document.createElement('div');
    //       $content.innerText = 'checkmo';
    //       _ctx.replaceHTML($content);
    //     },
    //   },
    // },
  })(block);
}
