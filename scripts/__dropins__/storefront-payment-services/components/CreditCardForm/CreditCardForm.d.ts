/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { CardType } from '@adobe-commerce/payment-services-sdk/payment';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface CreditCardFormProps extends HTMLAttributes<HTMLDivElement> {
    cardContainerId: string;
    cardNumberContainerId: string;
    expirationDateContainerId: string;
    securityCodeContainerId: string;
    eligibleCardTypes: CardType[];
    selectedCardType: CardType | null;
    validationErrors: {
        [key: string]: string;
    };
    isLoading?: boolean;
    showSaveCard?: boolean;
    saveCard?: boolean;
    onSaveCardChange?: (checked: boolean) => void;
}
export declare const CreditCardForm: FunctionComponent<CreditCardFormProps>;
