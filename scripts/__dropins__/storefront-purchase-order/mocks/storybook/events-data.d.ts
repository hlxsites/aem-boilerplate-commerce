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
import { PO_PERMISSIONS } from '../../api/permissions';
export declare const mockPermissions: {
    [PO_PERMISSIONS.PO_ALL]: boolean;
    [PO_PERMISSIONS.VIEW_CUSTOMER]: boolean;
    [PO_PERMISSIONS.SUPER_APPROVE]: boolean;
    [PO_PERMISSIONS.VIEW_RULES]: boolean;
    [PO_PERMISSIONS.MANAGE_RULES]: boolean;
    all: boolean;
    'Magento_Company::index': boolean;
    'Magento_Sales::all': boolean;
    'Magento_Company::user_management': boolean;
};
