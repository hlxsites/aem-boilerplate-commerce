import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentCardProps extends HTMLAttributes<HTMLDivElement> {
    brand?: string;
    maskedNumber?: string;
    expiry?: string;
    holderName?: string;
    selected?: boolean;
    selectable?: boolean;
    /** Accessible name for the radio; falls back to a generic label when omitted. */
    selectAriaLabel?: string;
    onSelect?: () => void;
}
export declare const PaymentCard: FunctionComponent<PaymentCardProps>;
//# sourceMappingURL=PaymentCard.d.ts.map