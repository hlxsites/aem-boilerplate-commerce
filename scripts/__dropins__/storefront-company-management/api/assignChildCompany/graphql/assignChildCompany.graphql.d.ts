/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export declare const ASSIGN_CHILD_COMPANY = "\n  mutation assignChildCompany($input: AssignChildCompanyInput!) {\n    assignChildCompany(input: $input) {\n      company_hierarchy {\n        parent {\n          ...COMPANY_HIERARCHY_ITEM_FRAGMENT\n        }\n        children {\n          ...COMPANY_HIERARCHY_ITEM_FRAGMENT\n        }\n      }\n    }\n  }\n  \n  fragment COMPANY_HIERARCHY_ITEM_FRAGMENT on CompanyBasicInfo {\n    id\n    is_admin\n    legal_name\n    name\n    status\n    __typename\n  }\n\n";
