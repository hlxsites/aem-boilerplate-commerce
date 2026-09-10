/********************************************************************
 * ADOBE CONFIDENTIAL
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
import { AttributesFormModel, OrderDataModel, OrderItemModel } from '../data/models';
import { InLineAlertProps, TaxTypes } from '.';
import { SlotProps } from '../../node_modules/@dropins/tools/src/lib';
import { ImageProps } from '../../node_modules/@dropins/tools/src/components';
import { RefObject } from 'preact';
import { MutableRefObject } from 'preact/compat';
type options = Record<string, string | number | boolean>;
export type StepsTypes = 'products' | 'attributes' | 'success' | 'error';
type onSuccessTypes = {
    uid: string;
    number: string;
    status: string;
    createdAt: string;
};
export interface CreateReturnProps {
    orderData?: OrderDataModel;
    slots?: {
        Footer: SlotProps;
        ReturnOrderItem: SlotProps;
        ReturnFormActions: SlotProps<{
            handleChangeStep: (value: StepsTypes) => void;
        }>;
        ReturnReasonFormImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
        CartSummaryItemImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    className: string;
    onSuccess?: (response: onSuccessTypes | {}) => void;
    onError?: (message: string) => void;
    routeReturnSuccess?: () => string;
    showConfigurableOptions?: (options: options | {}) => options;
}
export interface ReturnOrderProductListProps {
    placeholderImage: string;
    slots?: {
        Footer: SlotProps;
        ReturnOrderItem: SlotProps;
        CartSummaryItemImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    itemsEligibleForReturn: OrderItemModel[];
    loading: boolean;
    taxConfig: TaxTypes;
    translations: Record<string, string>;
    selectedProductList: OrderItemModel[] | [];
    handleSelectedProductList: (product: any) => void;
    showConfigurableOptions?: (options: options | {}) => options;
    handleSetQuantity: (value: number, productSku: string) => void;
    handleChangeStep: (value: StepsTypes) => void;
}
export interface ReturnReasonFormProps {
    placeholderImage: string;
    slots?: {
        ReturnFormActions: SlotProps<{
            handleChangeStep: (value: StepsTypes) => void;
        }>;
        ReturnReasonFormImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    formsRef: MutableRefObject<RefObject<HTMLFormElement>[]>;
    loading: boolean;
    translations: Record<string, string>;
    fieldsConfig: AttributesFormModel[] | [];
    selectedProductList: OrderItemModel[] | [];
    handleChangeStep: (value: StepsTypes) => void;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
}
export interface ReturnOrderMessageProps {
    translations: Record<string, string>;
    routeReturnSuccess?: (orderData?: OrderDataModel) => string;
    orderData?: OrderDataModel;
}
export interface UseCreateReturn {
    orderData?: OrderDataModel;
    onSuccess?: (response: onSuccessTypes | {}) => void;
    onError?: (message: string) => void;
    handleSetInLineAlert: (value?: InLineAlertProps) => void;
}
export {};
