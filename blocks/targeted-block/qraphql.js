import { fetchGraphQl } from '@dropins/tools/fetch-graphql.js';
import * as Cart from '@dropins/storefront-cart/api.js';

export const getActiveRules = async () => {
  try {
    const response = await fetchGraphQl(
      `query CUSTOMER_SEGMENTS($cartId: String!){
          customerSegments(cartId: $cartId) {
            name
          }
          CustomerGroup {
            name
          }
          cart(cart_id: $cartId) {
            rules {
              name
            }
          }
        }
      `,
      {
        method: 'GET',
        variables: {
          cartId: Cart.getCartDataFromCache().id,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};

export const getCatalogPriceRules = async (sku) => {
  try {
    const query = `query {
          products(filter: {
            sku: {
              eq: "${sku}"
            } 
          })
          {
            items {
              rules {
                name
              }
            }
          }
        }
      `;
    const response = await fetchGraphQl(
      query,
      {
        method: 'GET',
      },
    );
    return response.data?.products?.items[0];
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};
