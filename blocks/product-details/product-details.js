/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

// Drop-in Tools
import { initializers } from '@dropins/elsie/initializer.js';

// Drop-in APIs
import * as product from '@dropins/storefront-pdp/api.js';
import { addProductsToCart } from '@dropins/storefront-cart/api.js';

// Drop-in Providers
import { render as productRenderer } from '@dropins/storefront-pdp/render.js';

// Drop-in Containers
import ProductDetails from '@dropins/storefront-pdp/containers/ProductDetails.js';

// Libs
import { getConfigValue } from '../../scripts/configs.js';
import { getSkuFromUrl } from '../../scripts/commerce.js';

export default async function decorate(block) {
  // Initialize Drop-ins
  initializers.register(product.initialize, {});

  // Set Fetch Endpoint (Service)
  product.setEndpoint(await getConfigValue('commerce-endpoint'));

  // Set Fetch Headers (Service)
  product.setFetchGraphQlHeaders({
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  });

  // Render Containers
  return productRenderer.render(ProductDetails, {
    sku: getSkuFromUrl(),
    slots: {
      Actions: (ctx) => {
        // Add to Cart Button
        ctx.appendButton({
          text: 'Add to Cart',
          icon: 'Cart',
          variant: 'primary',
          onClick: async () => {
            try {
              await addProductsToCart([{ ...ctx.values }]);
              window.location.href = '/cart';
            } catch (error) {
              console.warn('Error adding product to cart', error);
            }
          },
        });

        // Add to Wishlist Button
        // ctx.appendButton({
        //   icon: 'Heart',
        //   variant: 'primary',
        //   onClick: () => console.debug('Add to Wishlist', ctx.data),
        // });
      },
    },
  })(block);
}
