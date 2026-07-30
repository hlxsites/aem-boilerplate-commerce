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
import { FieldsProps } from '.';
type errorInformationProps = {
    error: string;
};
export interface inLineAlertProps {
    text: string;
    type: 'success' | 'warning' | 'error';
}
export type RouteSignInProps = {
    render: boolean;
    formValues?: {
        number: number | string;
        email?: string;
    };
};
export interface OrderSearchProps {
    className?: string;
    onError?: (errorInformation: errorInformationProps) => void;
    isAuth: boolean;
    renderSignIn?: ({ render, formValues, }: RouteSignInProps) => boolean | undefined;
    routeCustomerOrder?: () => string;
    routeGuestOrder?: () => string;
}
export interface useOrderSearchProps extends Omit<OrderSearchProps, 'className'> {
}
export interface OrderSearchFormProps {
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    loading?: boolean;
    inLineAlert: inLineAlertProps;
    fieldsConfig?: FieldsProps[];
}
export interface useOrderSearch extends Omit<OrderSearchProps, 'className'> {
}
export {};
