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
import { FieldEnumList, inLineAlertProps, useOrderSearchProps } from '../../types';
export declare const useOrderSearch: ({ onError, isAuth, renderSignIn, routeCustomerOrder, routeGuestOrder, }: useOrderSearchProps) => {
    onSubmit: (event: Event, valid: boolean) => Promise<null | undefined>;
    inLineAlert: inLineAlertProps;
    loading: boolean;
    normalizeFieldsConfig: {
        entityType: string;
        is_unique: boolean;
        label: string | undefined;
        options: never[];
        defaultValue: string;
        fieldType: FieldEnumList;
        className: string;
        required: boolean;
        orderNumber: number;
        name: string;
        id: string;
        code: string;
        isUnique: boolean;
    }[];
};
