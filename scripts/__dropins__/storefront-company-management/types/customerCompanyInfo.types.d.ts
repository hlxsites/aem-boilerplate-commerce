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
import { CustomerCompanyInfo } from '../data/models/customer-company-info';
export interface CustomerCompanyInfoProps {
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
}
export interface CustomerCompanyInfoCardProps {
    /** Customer's company information including name, job title, work phone, and role */
    customerCompanyInfo: CustomerCompanyInfo | null;
    /** Indicates whether company information is currently being loaded */
    loading?: boolean;
    /** Additional CSS classes to apply to the card for custom styling */
    className?: string;
}
