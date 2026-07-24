/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
import { FunctionComponent } from 'preact';
import { SharedRequisitionListResult } from '../../api/getSharedRequisitionList';
export type SharedRequisitionListStatus = 'preview_loading' | 'preview_loaded' | 'preview_error' | 'importing' | 'import_success' | 'import_error';
export interface SharedRequisitionListProps {
    status: SharedRequisitionListStatus;
    previewData: SharedRequisitionListResult | null;
    errorMessage: string;
    onImport: () => void;
    translations: {
        loading: string;
        previewTitle: string;
        senderLabel: string;
        listNameLabel: string;
        descriptionLabel: string;
        itemsCountLabel: string;
        importButton: string;
        importingButton: string;
        successImport: string;
        skuHeader: string;
        qtyHeader: string;
        optionsHeader: string;
    };
}
export declare const SharedRequisitionList: FunctionComponent<SharedRequisitionListProps>;
