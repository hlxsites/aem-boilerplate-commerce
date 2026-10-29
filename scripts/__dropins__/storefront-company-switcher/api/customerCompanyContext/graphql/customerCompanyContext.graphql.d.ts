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
export declare const GET_CUSTOMER_COMPANY_CONTEXT = "\n  query GET_CUSTOMER_COMPANIES($pageSize: Int) {\n    customer {\n      ...CUSTOMER_FRAGMENT\n    }\n    company {\n      ...COMPANY_FRAGMENT\n    }\n    customerGroup {\n      uid\n    }\n  }\n\n  \n  fragment CUSTOMER_FRAGMENT on Customer {\n    companies(input: { pageSize: $pageSize }) {\n      items {\n        name\n        id\n        status\n      }\n    }\n  }\n\n  \n  fragment COMPANY_FRAGMENT on Company {\n    name\n    id\n    status\n  }\n\n";
