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
import { CompanyPermissionFlags } from './companyPermission.types';
export interface CompanyTeamFormProps {
    mode: 'add' | 'edit';
    entityId?: string;
    parentStructureId?: string | null;
    permissions: CompanyPermissionFlags | null;
    onSaved: (result: {
        label: string;
        structureId?: string;
        entityId?: string;
        type: 'team';
    }) => void;
    onCancel: () => void;
    onError?: (error: string) => void;
    onSuccess?: (message: string) => void;
}
export interface CompanyUserFormProps {
    mode: 'add' | 'edit';
    entityId?: string;
    parentStructureId?: string | null;
    permissions: CompanyPermissionFlags | null;
    onSaved: (result: {
        label: string;
        structureId?: string;
        entityId?: string;
        type: 'user';
        status?: 'ACTIVE' | 'INACTIVE';
        jobTitle?: string | null;
    }) => void;
    onCancel: () => void;
    onError?: (error: string) => void;
    onSuccess?: (message: string) => void;
}
