export interface StoreConfigModel {
    displayMiniCart: boolean;
    miniCartMaxItemsDisplay: number;
    cartExpiresInDays: number;
    cartSummaryDisplayTotal: number;
    defaultCountry: string;
    categoryFixedProductTaxDisplaySetting: string;
    productFixedProductTaxDisplaySetting: string;
    salesFixedProductTaxDisplaySetting: string;
    shoppingCartDisplaySetting: {
        fullSummary: boolean;
        grandTotal: boolean;
        price: number | string;
        shipping: number | string;
        subtotal: number | string;
        taxGiftWrapping: number | string;
        zeroTax: boolean;
    };
    useConfigurableParentThumbnail: boolean;
}
//# sourceMappingURL=store-models.d.ts.map