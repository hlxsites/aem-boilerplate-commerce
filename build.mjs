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
  // Extend PDP fragment with video support
  {
    npm: '@dropins/storefront-pdp',
    operations: [
      `
      fragment PRODUCT_FRAGMENT on ProductView {
        videos {
          url
          title
          preview {
            label
            roles
            url
          }
        }
      }
      `,
    ],
  },
]);
