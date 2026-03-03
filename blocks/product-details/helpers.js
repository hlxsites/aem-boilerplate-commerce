/**
 * Fetches product variants with their attributes
 * @param {string} sku - Product SKU
 * @param {Object} fetcherApi - API fetcher instance
 * @returns {Promise<Array>} Array of product variants
 */
export async function getProductAttributes(sku, fetcherApi) {
  const { data } = await fetcherApi.fetchGraphQl(
    `
      query GET_PRODUCT_VARIANTS($sku: String!) {
        variants(sku: $sku) {
          variants {
            product {
              sku
              name
              inStock
              attributes {
                name
                label
                value
                roles
              }
              images(roles: ["image"]) {
                url
              }
              ...on SimpleProductView {
                price {
                  final { amount { currency value } }
                }
              }
            }
          }
        }
      }
    `,
    {
      method: "GET",
      variables: { sku },
    },
  );

  return data?.variants?.variants ?? [];
}

/**
 * Calculates total quantity from selected products
 * @param {Array} products - Array of products with quantity
 * @returns {number} Total quantity
 */
export function calculateTotalQuantity(products) {
  return products.reduce((acc, item) => acc + (item.quantity || 0), 0);
}

/**
 * Updates Add to Cart button state for grid view
 * @param {Object} buttonInstance - Button instance
 * @param {Array} selectedProducts - Selected products array
 * @param {Object} labels - Placeholder labels
 */
export function updateGridOrderButton(
  buttonInstance,
  selectedProducts,
  labels,
) {
  const totalQuantity = calculateTotalQuantity(selectedProducts);
  const hasItems = totalQuantity > 0;

  buttonInstance.setProps((prev) => ({
    ...prev,
    children: hasItems
      ? `${labels.Global?.AddProductToCart} (${totalQuantity})`
      : labels.Global?.AddProductToCart,
    disabled: !hasItems,
  }));
}
