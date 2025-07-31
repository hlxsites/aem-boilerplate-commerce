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
  // Example of how to extend the PDP data
  {
    npm: '@dropins/storefront-pdp',
    operations: [
      `
      fragment PRODUCT_FRAGMENT on ProductView {
        lowStock
      }
      `,
    ],
  },
  // Example of how to extend the PLP data
  // The following fragments are available:
  // - fragment Facet on Aggregation
  // - fragment ProductView on ProductSearchItem

  {
    npm: '@dropins/storefront-product-discovery',
    operations: [
      // Here we are adding extra data to the Facet fragment
      // that we can use in the PLP to render an icon for each facet.
      // `
      //   fragment Facet on Aggregation {
      //     buckets {
      //       icon # note: this is not part of Catalog Service API, but could be extended with Mesh
      //     }
      //   }
      // `,
      // Here we are adding the options to the ProductView fragment
      // that we can use in the PLP to render the options in the product actions
      `
        fragment ProductView on ProductSearchItem {
          productView {
            ... on ComplexProductView {
              options {
                id
                title
                values {
                  title
                  id
                }
              }
            }
          }
        }
      `,
    ],
  },
]);
