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
export declare const GET_COMPANY_USERS_QUERY = "\n  query GET_COMPANY_USERS_QUERY(\n    $pageSize: Int = 100\n    $currentPage: Int = 1\n  ) {\n    company {\n      users(\n        filter: { status: ACTIVE }\n        pageSize: $pageSize\n        currentPage: $currentPage\n      ) {\n        items {\n          id\n          firstname\n          lastname\n          email\n        }\n        page_info {\n          total_pages\n          current_page\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getCompanyUsers.d.ts.map