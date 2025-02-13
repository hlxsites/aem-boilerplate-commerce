import { fetchGraphQl, setFetchGraphQlHeaders } from '@dropins/tools/fetch-graphql.js';
import { getHeaders } from '../../scripts/configs.js';

const getCustomerGroups = async () => {
  try {
    // setFetchGraphQlHeaders(await getHeaders('cart'));
    const response = await fetchGraphQl(
      `query {
          customerGroup {
            name
          }
        }
      `,
      {
        method: 'GET',
      },
    );
    return response.data?.customerGroup;
  } catch (error) {
    console.error('Could not retrieve customer groups', error);
  }
  return [];
};

const getCustomerSegments = async () => {
  try {
    // setFetchGraphQlHeaders(await getHeaders('cart'));
    const response = await fetchGraphQl(
      `query {
          customer {
            segments {
              name
            }
          }
        }
      `,
      {
        method: 'GET',
      },
    );
    return response.data?.customer?.segments || [];
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};

const getCartRules = async (cartId) => {
  try {
    // setFetchGraphQlHeaders(await getHeaders('cart'));
    const response = await fetchGraphQl(
      `query CART_RULES($cartId: String!){
          cart(cart_id: $cartId) {
            rules {
              name
            }
          }
        }
      `,
      {
        method: 'GET',
        variables: { cartId },
      },
    );
    return response.data?.cart?.rules || [];
  } catch (error) {
    console.error('Could not retrieve customer cart rules', error);
  }
  return [];
};

const getCatalogPriceRules = async (sku) => {
  try {
    const query = `query CATALOG_PRICE_RULES($sku: String!) {
          products(filter: {
            sku: {
              eq: $sku
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
    // setFetchGraphQlHeaders(await getHeaders('cart'));
    const response = await fetchGraphQl(
      query,
      {
        method: 'GET',
        variables: { sku },
      },
    );
    return response.data?.products?.items[0];
  } catch (error) {
    console.error(`Could not retrieve catalog price rules for ${sku}`, error);
  }
  return [];
};

export {
  getCustomerGroups,
  getCustomerSegments,
  getCartRules,
  getCatalogPriceRules,
};
