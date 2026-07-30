/*******************************************************************
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
import { UseApprovalRuleDetailsProps } from '../types/hooks';
export declare const useApprovalRuleDetails: ({ approvalRuleID, routeApprovalRulesList, }: UseApprovalRuleDetailsProps) => {
    handleRedirectToList: () => void;
    loading: boolean;
    formValues: ({
        label: import("preact").JSX.Element;
        value: string;
    } | {
        label: import("preact").JSX.Element;
        value: import("preact").JSX.Element;
    })[];
};
