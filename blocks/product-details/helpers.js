/**
 * Fetches product variants with their attributes
 * @param {string} sku - Product SKU
 * @param {Object} fetcherApi - API fetcher instance
 * @returns {Promise<Array>} Array of product variants
 */
export async function getProductVariants(sku, fetcherApi) {
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
      method: 'GET',
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
 * Filters variants to only include those with attributes matching product options
 * Also filters attributes inside each variant to only keep matching ones
 * @param {Array} variants - Array of product variants
 * @param {Array} productOptions - Array of product options with id field
 * @returns {Array} Filtered variants with filtered attributes
 */
export function filterVariantsByOptions(variants, productOptions) {
  if (!productOptions || productOptions.length === 0) {
    return variants;
  }

  const optionIds = new Set(productOptions.map((option) => option.id));

  return variants
    .map((variant) => {
      const filteredAttributes = variant.product.attributes.filter(
        (attr) => optionIds?.has(attr.name),
      );

      if (filteredAttributes.length === 0) {
        return null;
      }

      return {
        ...variant,
        product: {
          ...variant.product,
          attributes: filteredAttributes,
        },
      };
    })
    .filter((variant) => variant !== null);
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
