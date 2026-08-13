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
import { CompanyAclResourceResponse, CompanyRoleResponse, CompanyRolesResponse, PageInfoResponse, GetCompanyRolesResponse, GetCompanyRoleResponse, GetCompanyAclResourcesResponse, CreateCompanyRoleResponse, UpdateCompanyRoleResponse, CompanyRoleCreateInput, CompanyRoleUpdateInput } from '../../types/api/companyRoles.types';
import { CompanyAclResourceModel, CompanyRoleModel, CompanyRolesResponseModel, PageInfoModel, CompanyRoleCreateInputModel, CompanyRoleUpdateInputModel } from '../models/company-role';
export declare const transformCompanyAclResource: (response: CompanyAclResourceResponse) => CompanyAclResourceModel;
export declare const transformCompanyRole: (response: CompanyRoleResponse) => CompanyRoleModel;
export declare const transformPageInfo: (response: PageInfoResponse) => PageInfoModel;
export declare const transformCompanyRolesResponse: (response: CompanyRolesResponse) => CompanyRolesResponseModel;
export declare const transformGetCompanyRolesResponse: (response: GetCompanyRolesResponse) => CompanyRolesResponseModel;
export declare const transformGetCompanyRoleResponse: (response: GetCompanyRoleResponse) => CompanyRoleModel;
export declare const transformGetCompanyAclResourcesResponse: (response: GetCompanyAclResourcesResponse) => CompanyAclResourceModel[];
export declare const transformCreateCompanyRoleResponse: (response: CreateCompanyRoleResponse) => CompanyRoleModel;
export declare const transformUpdateCompanyRoleResponse: (response: UpdateCompanyRoleResponse) => CompanyRoleModel;
export declare const transformCompanyRoleCreateInput: (input: CompanyRoleCreateInputModel) => CompanyRoleCreateInput;
export declare const transformCompanyRoleUpdateInput: (input: CompanyRoleUpdateInputModel) => CompanyRoleUpdateInput;
