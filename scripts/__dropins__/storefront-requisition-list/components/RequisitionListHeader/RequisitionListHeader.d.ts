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
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface RequisitionListHeaderProps extends HTMLAttributes<HTMLDivElement> {
    name: string;
    description?: string;
    backLink?: {
        url: string;
        label: string;
        onClick?: (e: Event) => void;
    };
    actions?: {
        onRename?: () => void;
        onDelete?: () => void;
        onShare?: () => void;
        renameLabel?: string;
        deleteLabel?: string;
        shareLabel?: string;
        shareDisabled?: boolean;
        shareDisabledReason?: string;
    };
}
export declare const RequisitionListHeader: FunctionComponent<RequisitionListHeaderProps>;
