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
import { getCompanyResponse } from '../../types/api/getCompany.types';
import { updateCompanyResponse } from '../../types/api/updateCompany.types';
import { CompanyModel, CompanyRegistrationModel } from '../models/company';
export declare const transformCompany: (response: getCompanyResponse | updateCompanyResponse) => CompanyModel;
/**
 * Transform createCompany GraphQL response to Company model
 */
export declare const transformCreateCompanyResponse: (response: any) => CompanyRegistrationModel;
