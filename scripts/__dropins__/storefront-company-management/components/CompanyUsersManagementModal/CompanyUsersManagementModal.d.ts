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
import type { CompanyUserStatus } from '../../types';
export interface CompanyUsersManagementModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClose'> {
    /** The ID of the user to manage */
    userId: string;
    /** The current status of the user */
    userStatus: CompanyUserStatus;
    /** Callback function called when the modal should be closed */
    onClose: () => void;
    /** Whether the modal is currently open */
    isOpen?: boolean;
    /** Callback for success messages */
    onSuccess?: (message: string) => void;
}
export declare const CompanyUsersManagementModal: FunctionComponent<CompanyUsersManagementModalProps>;
