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
export declare const GET_COMPANY_ROLES = "\n  query getCompanyRoles($pageSize: Int, $currentPage: Int) {\n    company {\n      roles(pageSize: $pageSize, currentPage: $currentPage) {\n        items {\n          id\n          name\n        }\n        total_count\n        page_info {\n          current_page\n          page_size\n          total_pages\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getCompanyRoles.graphql.d.ts.map