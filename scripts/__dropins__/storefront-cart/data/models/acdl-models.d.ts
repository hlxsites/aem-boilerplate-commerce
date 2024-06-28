/**
 * ACDL Shopping Cart Types copied over from:
 *  https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/types/schemas/shoppingCart.ts
 */
export type ShoppingCartContext = {
    id: string | null;
    items?: Array<ShoppingCartItem>;
    prices?: {
        subtotalExcludingTax?: Price;
        subtotalIncludingTax?: Price;
    };
    totalQuantity: number;
    possibleOnepageCheckout?: boolean;
    giftMessageSelected?: boolean;
    giftWrappingSelected?: boolean;
    source?: string;
};
export type ChangedProductsContext = {
    items?: ShoppingCartItem[];
};
export type Price = {
    value: number;
    currency?: string;
    regularPrice?: number;
};
export type Product = {
    productId: number;
    name: string;
    sku: string;
    topLevelSku?: string | null;
    specialToDate?: string | null;
    specialFromDate?: string | null;
    newToDate?: string | null;
    newFromDate?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    manufacturer?: string | null;
    countryOfManufacture?: string | null;
    categories?: string[] | null;
    productType?: string | null;
    pricing?: {
        regularPrice: number;
        minimalPrice?: number;
        maximalPrice?: number;
        specialPrice?: number;
        tierPricing?: {
            customerGroupId?: number | null;
            qty: number;
            value: number;
        }[];
        currencyCode: string | null;
    };
    canonicalUrl?: string | null;
    mainImageUrl?: string | null;
};
export type ShoppingCartItem = {
    canApplyMsrp: boolean;
    formattedPrice: string;
    id: string;
    prices: {
        price: Price;
    };
    product: Product;
    configurableOptions?: Array<ConfigurableOption>;
    quantity: number;
};
export type ConfigurableOption = {
    id: number;
    optionLabel: string;
    valueId: number;
    valueLabel: string;
};
//# sourceMappingURL=acdl-models.d.ts.map