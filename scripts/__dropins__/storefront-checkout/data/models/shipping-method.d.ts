import { Money } from './money';

type Code = string;
type Title = string;
type Carrier = {
    code: Code;
    title: Title;
};
export type ShippingMethod = {
    amount: Money;
    carrier: Carrier;
    code: Code;
    title: Title;
    value: string;
};
export {};
//# sourceMappingURL=shipping-method.d.ts.map