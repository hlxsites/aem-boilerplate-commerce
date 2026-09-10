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
import { CustomerAddressesModel } from '../../data/models';
import { useAddressFormProps } from '../../types';
import { VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export declare const findNonEmptyObject: (obj1: Record<string, unknown> | undefined, obj2: CustomerAddressesModel | undefined) => CustomerAddressesModel | Record<string, unknown>;
export declare const useAddressForm: ({ showFormLoader, showSaveCheckBox, saveCheckBoxValue, addressFormId, billingCheckBoxValue, shippingCheckBoxValue, showShippingCheckBox, showBillingCheckBox, inputsDefaultValueSet, onCloseBtnClick, onSuccess, onError, formName, }: useAddressFormProps) => {
    regionOptions: {
        text: string;
        value: string;
    }[];
    saveCheckBoxAddress: boolean;
    inLineAlert: {
        text: string;
        type: "success" | "warning" | "error";
        icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    };
    addressId: string;
    submitLoading: boolean;
    normalizeFieldsConfig: {
        customUpperCode: string;
        defaultValue?: string | boolean | number;
        options?: any[];
        required?: boolean;
        disabled?: boolean;
    }[];
    handleSaveCheckBoxAddress: (event: Event) => void;
    handleUpdateAddress: (event: Event, valid: boolean) => Promise<void | null | undefined>;
    handleCreateAddress: (event: Event, valid: boolean) => Promise<void | null | undefined>;
    handleOnCloseForm: () => void;
    handleInputChange: (values: Record<string, string | number | boolean>) => void;
};
