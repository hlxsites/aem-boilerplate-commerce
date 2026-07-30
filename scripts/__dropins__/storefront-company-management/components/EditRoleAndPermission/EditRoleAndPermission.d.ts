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
import { CompanyRoleModel, CompanyAclResourceModel } from '../../data/models/company-role';
export interface EditRoleAndPermissionProps {
    mode: 'create' | 'edit';
    role?: CompanyRoleModel;
    aclResources: CompanyAclResourceModel[];
    existingRoleNames?: string[];
    loading?: boolean;
    onSubmit: (data: {
        name: string;
        permissions: string[];
    }) => void;
    onCancel: () => void;
    inLineAlertProps?: {
        type: 'success' | 'error' | 'warning';
        text: string;
        icon?: string;
    };
    prefillName?: string;
    prefillPermissions?: CompanyAclResourceModel[] | any[];
}
export declare const EditRoleAndPermission: FunctionComponent<EditRoleAndPermissionProps>;
