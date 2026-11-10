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
export interface RolesAndPermissionsProps {
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
    /**
     * When true, displays the header section with title.
     * Set to false when embedding within a layout that provides its own header.
     * @default false
     */
    withHeader?: boolean;
}
export declare const RolesAndPermissions: Container<RolesAndPermissionsProps>;
