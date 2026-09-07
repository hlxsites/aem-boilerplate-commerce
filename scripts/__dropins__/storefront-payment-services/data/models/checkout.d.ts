import { Price } from './price';

/** Interface subset to recreate checkout/updated event payload.
 * https://experienceleague.adobe.com/developer/commerce/storefront/dropins/checkout/events/#checkoutupdated-emits-and-listens
 */
export interface CheckoutData {
    /** Active cart id. */
    id?: string;
    /** Payment method currently selected by the shopper, if any. */
    selectedPaymentMethod?: {
        code: string;
    };
    billingAddress?: {
        firstName: string;
        lastName: string;
        street: string[];
        city: string;
        postCode: string;
        telephone?: string;
        company?: string;
        region?: {
            code: string;
            name: string;
        };
        country: {
            code: string;
            label: string;
        };
    };
    shippingAddresses: {
        selectedShippingMethod?: {
            amountExclTax: Price;
            carrier: {
                code: string;
            };
            code: string;
        };
    }[];
}
//# sourceMappingURL=checkout.d.ts.map