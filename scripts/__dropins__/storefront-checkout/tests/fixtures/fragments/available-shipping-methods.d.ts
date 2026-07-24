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
import { CurrencyEnum } from '../../../__generated__/types';
export declare const availableShippingMethodsFixture: ({
    amount: {
        currency: CurrencyEnum;
        value: number;
    };
    available: boolean;
    carrier_code: string;
    carrier_title: string;
    error_message: string;
    method_code: string;
    method_title: string;
    price_excl_tax: {
        value: number;
        currency: CurrencyEnum;
    };
    price_incl_tax: {
        value: number;
        currency: CurrencyEnum;
    };
    original_amount?: undefined;
} | {
    amount: {
        currency: CurrencyEnum;
        value: number;
    };
    available: boolean;
    carrier_code: string;
    carrier_title: string;
    error_message: string;
    method_code: string;
    method_title: string;
    original_amount: {
        value: number;
        currency: CurrencyEnum;
    };
    price_excl_tax: {
        value: number;
        currency: CurrencyEnum;
    };
    price_incl_tax: {
        value: number;
        currency: CurrencyEnum;
    };
})[];
