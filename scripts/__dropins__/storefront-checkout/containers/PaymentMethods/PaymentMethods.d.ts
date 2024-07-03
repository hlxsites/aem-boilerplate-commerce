import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodSlotContext {
    addPaymentMethodHandler: (code: string, handler: {
        render: SlotProps<PaymentMethodContentSlotContext>;
    }) => void;
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodContentSlotContext {
    cartId: string;
    onPlaceOrder: (fn: () => Promise<void>) => void;
    handleServerError: (error: any) => void;
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement> {
    paymentMethodsSlot?: SlotProps<PaymentMethodSlotContext>;
    onPlaceOrder: (fn: () => Promise<void>) => void;
    handleServerError: (error: any) => void;
    isShippingInfoRequired?: boolean;
}
export declare const PaymentMethods: Container<PaymentMethodsProps>;
//# sourceMappingURL=PaymentMethods.d.ts.map