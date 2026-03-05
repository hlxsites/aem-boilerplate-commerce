import { overrideGQLOperations } from '@dropins/build-tools/gql-extend.js';

overrideGQLOperations([
  // ACCS does not have Downloadable Items
  {
    npm: '@dropins/storefront-cart',
    skipFragments: ['DOWNLOADABLE_CART_ITEMS_FRAGMENT'],
    operations: [],
  },
  {
    npm: '@dropins/storefront-order',
    skipFragments: ['DOWNLOADABLE_ORDER_ITEMS_FRAGMENT'],
    operations: [],
  },
  // Extend the PDP data payload: override GraphQL fragment so option values that are products
  // include images (url, label). When you run the install command, build generates a new query
  // that includes this data. Used for group products; pdp initializer transformer normalizes
  // at options[].items[].product.images.
  // @see https://experienceleague.adobe.com/developer/commerce/storefront/dropins/all/extending/
  // @see https://experienceleague.adobe.com/developer/commerce/storefront/dropins/product-details/initialization/
  {
    npm: '@dropins/storefront-pdp',
    operations: [
      `
      fragment PRODUCT_OPTION_FRAGMENT on ProductViewOption {
        values {
          ... on ProductViewOptionValueProduct {
            product {
              images {
                url
                label
              }
            }
          }
        }
      }
      `,
    ],
  }
  // {
  //   npm: '@dropins/storefront-checkout',
  //   operations: [],
  // },
  // {
  //   npm: '@dropins/storefront-pdp',
  //   operations: [
  //     `
  //     fragment PRODUCT_FRAGMENT on ProductView {
  //       lowStock
  //     }
  //     `,
  //   ],
  // },
]);
