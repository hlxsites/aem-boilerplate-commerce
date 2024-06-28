import { GuestOrderDataFragment } from '../../__generated__/types';

type NonNullableItems = NonNullable<GuestOrderDataFragment['items']>;
type NonNullableItem = NonNullable<NonNullableItems[number]>;
export declare function transformItems(item: NonNullableItem): {
    uid: string;
    quantity: number | null | undefined;
    sku: string | null | undefined;
    name: string | null | undefined;
    image: {
        src: string | null | undefined;
        alt: string | null | undefined;
    };
    price: {
        value: number | null | undefined;
        currency: import('../../__generated__/types').CurrencyEnum | null | undefined;
    };
    priceInclTax: {
        value: number;
        currency: import('../../__generated__/types').CurrencyEnum;
    };
    total: {
        value: number;
        currency: import('../../__generated__/types').CurrencyEnum | null | undefined;
    };
    totalInclTax: {
        value: number;
        currency: import('../../__generated__/types').CurrencyEnum | null | undefined;
    };
    discount: {
        value: number;
        currency: import('../../__generated__/types').CurrencyEnum | null | undefined;
    };
    regularPrice: {
        value: number;
        currency: import('../../__generated__/types').CurrencyEnum;
    };
    discounted: boolean;
    configurableOptions: Record<string, string> | undefined;
    senderName: string | null | undefined;
    senderEmail: string | undefined;
    recipientEmail: string | undefined;
    recipientName: string | null | undefined;
};
export {};
//# sourceMappingURL=transform-order-items.d.ts.map