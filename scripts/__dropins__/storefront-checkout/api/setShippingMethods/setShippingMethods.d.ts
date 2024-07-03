import { SetShippingMethodsOnCartInput } from '../../__generated__/types';

export type SetShippingMethodsOnCartInputs = {
    cartId: string;
    shippingMethods: SetShippingMethodsOnCartInput['shipping_methods'];
};
export declare const setShippingMethodsOnCart: ({ cartId, shippingMethods, }: SetShippingMethodsOnCartInputs) => Promise<import('../../data/models/cart').Cart | null | undefined>;
//# sourceMappingURL=setShippingMethods.d.ts.map