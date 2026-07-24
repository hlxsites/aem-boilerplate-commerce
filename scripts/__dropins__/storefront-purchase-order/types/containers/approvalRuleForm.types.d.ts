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
import { FormValuesParams } from '../hooks';
export interface ApprovalRuleFormProps {
    withHeader?: boolean;
    withWrapper?: boolean;
    className?: string;
    approvalRuleID?: string;
    routeApprovalRulesList: () => string;
    onSubmit?: (formValues: FormValuesParams) => Promise<void>;
    onChange?: (formValues: FormValuesParams) => void;
}
