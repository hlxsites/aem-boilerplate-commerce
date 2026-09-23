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
/**
 * Isolated query for the company-scoped catalog view context.
 *
 * This is intentionally a self-contained operation (NOT part of
 * COMPANY_FRAGMENT). The backend that serves `Company.catalogViewContext` may
 * roll out independently from this storefront, so this field may be queried
 * against an endpoint whose schema does not yet declare it.
 */
export declare const GET_CATALOG_VIEW_CONTEXT = "\n  query GET_CATALOG_VIEW_CONTEXT {\n    company {\n      catalogViewContext {\n        catalogViewId\n        accessToken\n      }\n    }\n  }\n";
