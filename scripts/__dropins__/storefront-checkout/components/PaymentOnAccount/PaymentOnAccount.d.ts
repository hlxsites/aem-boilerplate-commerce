/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { Money } from '../../data/models';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export type CompanyCredit = {
    availableCredit: Money;
    exceedLimit?: boolean;
};
export interface PaymentOnAccountProps extends HTMLAttributes<HTMLFormElement> {
    referenceNumber?: string;
    onReferenceNumberChange?: (event: Event) => void;
    onReferenceNumberBlur?: (event: Event) => void;
    companyCredit?: CompanyCredit | null;
    totalAmount?: Money | null;
}
export declare const PaymentOnAccount: FunctionComponent<PaymentOnAccountProps & import("../ConditionalWrapper/ConditionalWrapper").ConditionalProps>;
