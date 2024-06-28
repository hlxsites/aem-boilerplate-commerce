export declare enum PriceDisplay {
    ExcludingTax = 1,
    IncludingTax = 2,
    IncludingAndExcludingTax = 3
}
export declare enum TotalDisplay {
    Rows = 0,
    Quantity = 1
}
export interface StoreConfig {
    defaultCountry: string;
    countriesWithRequiredRegion: string[];
    displayStateIfOptional: boolean;
    countriesWithOptionalZipCode: string[];
    isGuestCheckoutEnabled: boolean;
    isOnePageCheckoutEnabled: boolean;
    taxCartDisplay: {
        shoppingCartDisplayPrice: PriceDisplay;
        shoppingCartDisplayShipping: PriceDisplay;
        shoppingCartDisplaySubtotal: PriceDisplay;
        shoppingCartDisplayGiftWrapping: PriceDisplay;
        shoppingCartDisplayGrandTotal: boolean;
        shoppingCartDisplayFullSummary: boolean;
        shoppingCartDisplayZeroTax: boolean;
    };
    cartSummaryMaxItems: number;
    cartSummaryTotalDisplay: TotalDisplay;
}
//# sourceMappingURL=store-config.d.ts.map