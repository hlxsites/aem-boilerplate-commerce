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
import { CustomerCompanyInfo } from '../models/customer-company-info';
import { GetCustomerCompanyInfoResponse } from '../../types/api/getCustomerCompanyInfo.types';
/**
 * Transforms GraphQL response to CustomerCompanyInfo model
 * @param response - GraphQL response containing customer and company data
 * @returns Transformed customer company info or null if data is incomplete
 */
export declare const transformCustomerCompanyInfo: (response: GetCustomerCompanyInfoResponse) => CustomerCompanyInfo | null;
