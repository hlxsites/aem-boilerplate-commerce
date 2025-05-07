import { render as provider } from '@dropins/storefront-cart/render.js';
import MiniCart from '@dropins/storefront-cart/containers/MiniCart.js';

// Initializers
import '../../scripts/initializers/cart.js';

import { readBlockConfig } from '../../scripts/aem.js';
import { rootLink } from '../../scripts/scripts.js';
import { tryRenderAemAssetsImage } from '../../scripts/assets.js';

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
    'cart-url': cartURL = '',
    'checkout-url': checkoutURL = '',
  } = readBlockConfig(block);

  block.innerHTML = '';

  const productLink = (product) => rootLink(`/products/${product.url.urlKey}/${product.topLevelSku}`);
  return provider.render(MiniCart, {
    routeEmptyCartCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    routeCart: cartURL ? () => rootLink(cartURL) : undefined,
    routeCheckout: checkoutURL ? () => rootLink(checkoutURL) : undefined,
    routeProduct: productLink,

    slots: {
      Thumbnail: (ctx) => {
        const { item, defaultImageProps } = ctx;
        const anchorWrapper = document.createElement('a');
        anchorWrapper.href = productLink(item);

        tryRenderAemAssetsImage(ctx, {
          alias: item.sku,
          imageProps: defaultImageProps,
          wrapper: anchorWrapper,
        });
      },
    },
  })(block);
}
