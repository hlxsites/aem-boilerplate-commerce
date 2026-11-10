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
export declare const CREATE_COMPANY_ROLE = "\n  mutation CreateCompanyRole($input: CompanyRoleCreateInput!) {\n    createCompanyRole(input: $input) {\n      role {\n        ...CompanyRoleFragment\n      }\n    }\n  }\n  \n  fragment CompanyRoleFragment on CompanyRole {\n    id\n    name\n    users_count\n    permissions {\n      id\n      text\n      sort_order\n      children {\n        id\n        text\n        sort_order\n        children {\n          id\n          text\n          sort_order\n          children {\n            id\n            text\n            sort_order\n            children {\n              id\n              text\n              sort_order\n            }\n          }\n        }\n      }\n    }\n  }\n\n";
export declare const UPDATE_COMPANY_ROLE = "\n  mutation UpdateCompanyRole($input: CompanyRoleUpdateInput!) {\n    updateCompanyRole(input: $input) {\n      role {\n        ...CompanyRoleFragment\n      }\n    }\n  }\n  \n  fragment CompanyRoleFragment on CompanyRole {\n    id\n    name\n    users_count\n    permissions {\n      id\n      text\n      sort_order\n      children {\n        id\n        text\n        sort_order\n        children {\n          id\n          text\n          sort_order\n          children {\n            id\n            text\n            sort_order\n            children {\n              id\n              text\n              sort_order\n            }\n          }\n        }\n      }\n    }\n  }\n\n";
export declare const DELETE_COMPANY_ROLE = "\n  mutation DeleteCompanyRole($id: ID!) {\n    deleteCompanyRole(id: $id) {\n      success\n    }\n  }\n";
