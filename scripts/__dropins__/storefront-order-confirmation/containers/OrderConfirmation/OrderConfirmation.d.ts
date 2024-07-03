import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';
import { CustomerAddressInput } from '../../__generated__/types';

export interface SignUpInputsDefaultValueSetProps {
    code: string;
    defaultValue: string;
}
export interface OrderConfirmationProps extends HTMLAttributes<HTMLDivElement> {
    orderRef?: string;
    routeHome?: () => string;
    routeSupport?: () => string;
    onSignUpClick?: ({ inputsDefaultValueSet, addressesData, }: {
        inputsDefaultValueSet: SignUpInputsDefaultValueSetProps[];
        addressesData: CustomerAddressInput[];
    }) => void;
}
export declare const OrderConfirmation: Container<OrderConfirmationProps>;
//# sourceMappingURL=OrderConfirmation.d.ts.map