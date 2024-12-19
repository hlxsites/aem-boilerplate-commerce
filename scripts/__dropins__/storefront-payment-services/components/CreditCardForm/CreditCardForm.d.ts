import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CardType } from '@adobe-commerce/payment-services-sdk/payment';

export interface CreditCardFormProps extends HTMLAttributes<HTMLDivElement> {
    cardContainerId: string;
    cardNumberContainerId: string;
    expirationDateContainerId: string;
    securityCodeContainerId: string;
    eligibleCards: CardType[];
    cardTypeSelected: CardType | null;
    validationErrors: {
        [key: string]: string;
    };
    isLoading?: boolean;
}
export declare const CreditCardForm: FunctionComponent<CreditCardFormProps>;
//# sourceMappingURL=CreditCardForm.d.ts.map