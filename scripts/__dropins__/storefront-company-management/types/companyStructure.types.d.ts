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
import { SlotProps } from '@dropins/tools/lib';
import { CompanyStructureNode } from '../data/models';
import { CompanyPermissionFlags } from './companyPermission.types';
export interface CompanyStructureDataContext {
    structureData: CompanyStructureNode[];
}
export interface CompanyStructureProps {
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
    /**
     * When true, displays the header section.
     * Set to false when embedding within a layout that provides its own header.
     * @default false
     */
    withHeader?: boolean;
    /** Slot configuration for customizing structure data display */
    slots?: {
        StructureData?: SlotProps<CompanyStructureDataContext & {
            Default?: any;
        }>;
    };
    /** Indicates whether the current user is authenticated */
    isAuthenticated?: boolean;
    /** Callback to redirect unauthenticated users to login page */
    onRedirectLogin?: () => void;
    /** Callback to redirect to account page when registration is disabled */
    onRedirectAccount?: () => void;
}
export interface CompanyStructureCardProps {
    permissions: CompanyPermissionFlags | null;
    slots?: {
        StructureData?: SlotProps<CompanyStructureDataContext & {
            Default?: any;
        }>;
    };
}
