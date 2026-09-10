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
import { CustomerAddressesModel } from '../data/models';
import { FieldsProps } from './form.types';
import { SlotProps } from '@dropins/tools/src/lib';
export interface DefaultCheckBox extends Omit<FieldsProps, 'options'> {
}
export interface AddressCardContext {
    addressData: {
        label?: string | null;
        name?: string;
        orderNumber?: number;
        value?: string;
    }[];
}
export interface AddressesProps {
    hideActionFormButtons?: boolean;
    fieldIdPrefix?: string;
    formName?: string;
    slots?: {
        [key: string]: SlotProps;
    };
    title?: string;
    headerLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    addressFormTitle?: string;
    defaultSelectAddressId?: number | string;
    showFormLoader?: boolean;
    forwardFormRef?: HTMLInputElement;
    selectShipping?: boolean;
    selectBilling?: boolean;
    showSaveCheckBox?: boolean;
    saveCheckBoxValue?: boolean;
    selectable?: boolean;
    className?: string;
    withHeader?: boolean;
    minifiedView: boolean;
    withActionsInMinifiedView?: boolean;
    withActionsInFullSizeView?: boolean;
    inputsDefaultValueSet?: CustomerAddressesModel;
    addressesFormTitle?: string;
    showShippingCheckBox?: boolean;
    showBillingCheckBox?: boolean;
    shippingCheckBoxValue?: boolean;
    billingCheckBoxValue?: boolean;
    routeAddressesPage?: () => string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    onSubmit?: (event: Event, formValid: boolean) => Promise<void>;
    onAddressData?: (values: {} | CustomerAddressesModel | undefined) => void;
}
export interface AddressesWrapperProps extends Omit<AddressesProps, 'formName'> {
    inputName: string;
    minifiedViewKey: 'minifiedView' | 'fullSizeView';
}
export interface useAddressesProps extends Omit<AddressesProps, 'className' | 'inputsDefaultValueSet' | 'addressesFormTitle' | 'shippingCheckBoxValue' | 'billingCheckBoxValue' | 'showFormLoader' | 'title' | 'slots' | 'formName' | 'hideActionFormButtons'> {
}
export interface KeysSortOrderProps {
    name: string;
    orderNumber?: number;
    label?: string | null;
}
export interface AddressCardProps {
    slots?: {
        [key: string]: SlotProps;
    };
    selectShipping?: boolean;
    selectBilling?: boolean;
    selectable?: boolean;
    variant?: 'secondary' | 'primary';
    minifiedView: boolean;
    addressData: CustomerAddressesModel | undefined;
    keysSortOrder?: KeysSortOrderProps[];
    loading?: boolean;
    setAddressId?: (id: string) => void;
    handleRenderModal?: () => void | undefined;
    handleRenderForm?: () => void | undefined;
}
export interface AddressActionsProps {
    className?: string;
    selectable?: boolean;
    minifiedView?: boolean;
    addNewAddress?: boolean;
    viewAllAddressesText?: string;
    routeAddressesPage: (event: Event) => void;
}
export interface AddressModalProps {
    minifiedView: boolean;
    addressData?: CustomerAddressesModel;
    keysSortOrder?: KeysSortOrderProps[];
    open: boolean;
    submitLoading: boolean;
    onRemoveAddress: () => void;
    closeModal: () => void;
}
