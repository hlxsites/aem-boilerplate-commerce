/**
 * Interface subset to recreate the pdp/data event payload.
 *  https://experienceleague.adobe.com/en/tools/commerce-storefront/dropins/product-details/events/
 */
export interface PdpDataModel {
    /**
     * Indicates whether the product is a bundle.
     */
    isBundle: boolean;
    /**
     * The sku of the specific variant currently selected on the PDP.
     */
    variantSku?: string;
}
/**
 * Interface subset to recreate the pdp/values event payload.
 *  https://experienceleague.adobe.com/en/tools/commerce-storefront/dropins/product-details/events/
 */
export interface PdpValuesModel {
    sku: string;
    quantity: number;
    optionsUIDs?: string[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
}
//# sourceMappingURL=pdp.d.ts.map