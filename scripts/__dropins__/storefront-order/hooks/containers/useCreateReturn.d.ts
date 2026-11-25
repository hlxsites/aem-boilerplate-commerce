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
import { AttributesFormModel, OrderItemModel } from '../../data/models/index.js';
import { StepsTypes, UseCreateReturn } from '../../types/index.js';
import { RefObject } from 'preact';
export declare const useCreateReturn: ({ onSuccess, onError, handleSetInLineAlert, orderData, }: UseCreateReturn) => {
    order: {
        giftReceiptIncluded?: boolean | undefined;
        printedCardIncluded?: boolean | undefined;
        giftWrappingOrder?: {
            price: import("../../types/index.js").MoneyProps;
            uid: string;
        } | undefined;
        placeholderImage?: string;
        returnNumber?: string;
        id: string;
        orderStatusChangeDate?: string;
        number?: string | undefined;
        email: string;
        token?: string;
        status?: string | undefined;
        isVirtual?: boolean | undefined;
        totalQuantity?: number | undefined;
        shippingMethod?: string;
        carrier?: string;
        orderDate?: string | undefined;
        adminAssistedOrder?: boolean;
        comments?: import("../../types/index.js").OrderCommentItem[] | undefined;
        returns?: import("../../data/models/index.js").OrdersReturnPropsModel[] | undefined;
        discounts?: {
            amount: import("../../types/index.js").MoneyProps;
            label: string;
        }[] | undefined;
        coupons?: {
            code: string;
        }[] | undefined;
        payments?: {
            code: string;
            name: string;
        }[] | undefined;
        shipping?: {
            code: string;
            amount: number;
            currency: string;
        };
        shipments?: import("../../data/models/index.js").ShipmentsModel[] | undefined;
        items?: OrderItemModel[] | undefined;
        totalGiftCard?: import("../../types/index.js").MoneyProps | undefined;
        grandTotal?: import("../../types/index.js").MoneyProps | undefined;
        grandTotalExclTax?: import("../../types/index.js").MoneyProps | undefined;
        totalShipping?: import("../../types/index.js").MoneyProps;
        subtotalExclTax?: import("../../types/index.js").MoneyProps | undefined;
        subtotalInclTax?: import("../../types/index.js").MoneyProps | undefined;
        totalTax?: import("../../types/index.js").MoneyProps | undefined;
        shippingAddress?: import("../../data/models/index.js").OrderAddressModel | undefined;
        totalGiftOptions?: {
            giftWrappingForItems: import("../../types/index.js").MoneyProps;
            giftWrappingForItemsInclTax: import("../../types/index.js").MoneyProps;
            giftWrappingForOrder: import("../../types/index.js").MoneyProps;
            giftWrappingForOrderInclTax: import("../../types/index.js").MoneyProps;
            printedCard: import("../../types/index.js").MoneyProps;
            printedCardInclTax: import("../../types/index.js").MoneyProps;
        } | undefined;
        billingAddress?: import("../../data/models/index.js").OrderAddressModel | undefined;
        availableActions?: import("../../types/index.js").AvailableActionsProps[] | undefined;
        taxes?: {
            amount: import("../../types/index.js").MoneyProps;
            rate: number;
            title: string;
        }[] | undefined;
        appliedGiftCards?: {
            code: string;
            appliedBalance: import("../../types/index.js").MoneyProps;
        }[] | undefined;
    };
    steps: StepsTypes;
    loading: boolean;
    formsRef: import("preact/hooks").MutableRef<RefObject<HTMLFormElement>[]>;
    attributesList: [] | AttributesFormModel[];
    selectedProductList: [] | OrderItemModel[];
    itemsEligibleForReturn: OrderItemModel[];
    handleSelectedProductList: (orderItem: OrderItemModel) => void;
    handleSetQuantity: (value: number, productSku: string) => void;
    handleChangeStep: (value: StepsTypes) => void;
    onSubmit: (_: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
};
