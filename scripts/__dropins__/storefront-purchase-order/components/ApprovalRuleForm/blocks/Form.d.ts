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
import { CustomerRolePermissionsModel } from '../../../data/models';
declare const Form: ({ availableRequiresApprovalFrom, conditionOperators, availableAppliesTo, appliesToOptions, ruleTypeOptions, currencies, formValues, errors, touched, isLoading, permissions, handleSubmit, handleFieldTouch, handleSetFormValues, routeApprovalRulesList, t, }: {
    availableRequiresApprovalFrom: {
        id: string;
        name: string;
    }[];
    conditionOperators: {
        value: string;
        text: string;
    }[];
    availableAppliesTo: {
        id: string;
        name: string;
    }[];
    appliesToOptions: {
        value: string;
        text: string;
    }[];
    ruleTypeOptions: {
        value: string;
        text: string;
    }[];
    currencies: {
        value: string;
        text: string;
    }[];
    formValues: any;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isLoading: boolean;
    permissions?: CustomerRolePermissionsModel;
    handleSubmit: () => void;
    handleFieldTouch: (field: string) => void;
    handleSetFormValues: (field: string, value: any) => void;
    routeApprovalRulesList?: () => string;
    t: Record<string, string>;
}) => import("preact").JSX.Element;
export default Form;
