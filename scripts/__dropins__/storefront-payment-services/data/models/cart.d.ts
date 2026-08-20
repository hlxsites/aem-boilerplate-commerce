import { Price } from './price';

/**
 * Interface subset to recreate card/data event payload.
 *  https://experienceleague.adobe.com/developer/commerce/storefront/dropins/cart/events/#cartdata-emits-and-listens
 */
export interface CartModel {
    isVirtual: boolean;
    items: {
        uid: string;
        sku: string;
        name: string;
        quantity: number;
        rowTotal: Price;
    }[];
    total: {
        includingTax: Price;
        excludingTax: Price;
    };
    subtotal: {
        excludingTax: Price;
        includingTax: Price;
        includingDiscountOnly: Price;
    };
}
//# sourceMappingURL=cart.d.ts.map