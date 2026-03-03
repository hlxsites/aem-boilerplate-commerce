import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { OrderProductList } from '@dropins/storefront-order/containers/OrderProductList.js';
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';
import { tryRenderAemAssetsImage } from '@dropins/tools/lib/aem/assets.js';
import { addProductsToCart } from '@dropins/storefront-cart/api.js';

// Initialize
import '../../scripts/initializers/order.js';
import '../../scripts/initializers/cart.js';
import { getProductLink, rootLink } from '../../scripts/commerce.js';

export default async function decorate(block) {
  const createProductLink = (productData) => {
    if (!productData) {
      return rootLink('#');
    }
    const { product, productUrlKey } = productData;
    if (!product || !productUrlKey || !product.sku) {
      return rootLink('#');
    }
    return getProductLink(productUrlKey, product.sku);
  };
  await orderRenderer.render(OrderProductList, {
    slots: {
      CartSummaryItemImage: (ctx) => {
        const { data, defaultImageProps } = ctx;
        const anchor = document.createElement('a');
        anchor.href = createProductLink(data);

        tryRenderAemAssetsImage(ctx, {
          alias: data.product.sku,
          imageProps: defaultImageProps,
          wrapper: anchor,

          params: {
            width: defaultImageProps.width,
            height: defaultImageProps.height,
          },
        });
      },
      Footer: (ctx) => {
        const giftOptions = document.createElement('div');

        CartProvider.render(GiftOptions, {
          item: ctx.item,
          view: 'product',
          dataSource: 'order',
          isEditable: false,
          slots: {
            SwatchImage: (swatchCtx) => {
              const { defaultImageProps, imageSwatchContext } = swatchCtx;
              tryRenderAemAssetsImage(swatchCtx, {
                alias: imageSwatchContext.label,
                imageProps: defaultImageProps,
                wrapper: document.createElement('span'),

                params: {
                  width: defaultImageProps.width,
                  height: defaultImageProps.height,
                },
              });
            },
          },
        })(giftOptions);

        ctx.appendChild(giftOptions);

        // Reorder button
        const reorderButton = document.createElement('button');
        reorderButton.textContent = 'Reorder'; // ideally use a placeholder value ctx.dictionary.Global.Reorder

        // get the item data from the context
        const item = {
          sku: ctx.item.productSku,
          quantity: ctx.item.quantityOrdered,
        };

        reorderButton.addEventListener('click', async () => {
          try {
            // Use the Cart Drop-in's API function to add the item to the cart
            await addProductsToCart([{ ...item }]);
          } catch (error) {
            console.error(error);
          }
        });
        ctx.appendChild(reorderButton);
      },
    },
    routeProductDetails: createProductLink,
  })(block);
}
