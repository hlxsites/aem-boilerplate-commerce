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
 * Config-only counterpart of GET_COMPANY_ADDRESS_BOOK.
 *
 * The full query asks for `config` *and* `addresses`; a customer without the
 * company address permission gets an error for the address fields, which fails
 * the whole request and takes the config down with it. Callers that only need
 * to know whether the address book is switched on must use this query instead.
 */
export declare const GET_COMPANY_ADDRESS_BOOK_CONFIG = "\n  query GET_COMPANY_ADDRESS_BOOK_CONFIG {\n    company {\n      config {\n        address_book_enabled\n        address_book_custom_shipping_address_enabled\n      }\n    }\n  }\n";
