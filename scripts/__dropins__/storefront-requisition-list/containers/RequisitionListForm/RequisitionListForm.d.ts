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
import { Container } from '@dropins/tools/lib';
import { RequisitionListFormMode, RequisitionListFormValues } from '../../hooks/useRequisitionListForm';
import { RequisitionList } from '../../data/models/requisitionList';
export interface RequisitionListFormProps {
    mode: RequisitionListFormMode;
    requisitionListUid?: string;
    defaultValues?: RequisitionListFormValues;
    onSuccess?: (newList: RequisitionList) => void;
    onError?: (message: string) => void;
    onCancel: () => void;
}
export declare const RequisitionListForm: Container<RequisitionListFormProps>;
