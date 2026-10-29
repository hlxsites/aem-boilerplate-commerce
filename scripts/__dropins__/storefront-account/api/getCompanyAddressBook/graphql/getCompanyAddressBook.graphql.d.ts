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
export declare const GET_COMPANY_ADDRESS_BOOK = "\n  query GET_COMPANY_ADDRESS_BOOK {\n    company {\n      config {\n        address_book_enabled\n        address_book_custom_shipping_address_enabled\n        __typename\n      }\n      default_billing_address {\n        ...COMPANY_ADDRESS_FRAGMENT\n      }\n      default_shipping_address {\n        ...COMPANY_ADDRESS_FRAGMENT\n      }\n      addresses {\n        items {\n          ...COMPANY_ADDRESS_FRAGMENT\n        }\n        page_info {\n          current_page\n          page_size\n          total_pages\n        }\n        total_count\n      }\n    }\n  }\n  \n  fragment COMPANY_ADDRESS_FRAGMENT on CompanyAddress {\n    id\n    company_id\n    address_type\n    is_default\n    company\n    city\n    country_code\n    street\n    telephone\n    postcode\n    firstname\n    lastname\n    middlename\n    nickname\n    prefix\n    suffix\n    fax\n    vat_id\n    region_id\n    region {\n      region\n      region_code\n      region_id\n    }\n    custom_attributes {\n      ... on AttributeValue {\n        code\n        value\n      }\n    }\n    extension_attributes {\n      attribute_code\n      value\n    }\n  }\n\n";
