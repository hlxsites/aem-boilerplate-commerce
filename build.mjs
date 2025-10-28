import { overrideGQLOperations } from '@dropins/build-tools/gql-extend.js';

overrideGQLOperations([
  // ACCS does not have Downloadable Items
  {
    npm: '@dropins/storefront-cart',
    skipFragments: ['DOWNLOADABLE_CART_ITEMS_FRAGMENT'],
    operations: [
      `
      fragment CART_FRAGMENT on Cart {
        shipping_addresses {
          selected_shipping_method {
            amount {
              currency
              value
            }
            carrier_code
            carrier_title
            method_code
            method_title
            price_excl_tax {
              value
              currency
            }
            price_incl_tax {
              value
              currency
            }
          }
        }
      }
      `,
    ],
  },
  {
    npm: '@dropins/storefront-order',
    skipFragments: ['DOWNLOADABLE_ORDER_ITEMS_FRAGMENT'],
    operations: [],
  },
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
