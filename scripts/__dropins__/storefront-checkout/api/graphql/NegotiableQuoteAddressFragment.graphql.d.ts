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
export declare const NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT = "\n  fragment NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT on NegotiableQuoteBillingAddress {\n    city\n    company\n    country {\n      code\n      label\n    }\n    custom_attributes {\n      ... on AttributeValue {\n        code\n        value\n      }\n    }\n    customer_address_uid\n    fax\n    firstname\n    lastname\n    middlename\n    postcode\n    prefix\n    region {\n      region_id\n      code\n      label\n    }\n    street\n    suffix\n    telephone\n    uid\n    vat_id\n  }\n";
export declare const NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT = "\n  fragment NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT on NegotiableQuoteShippingAddress {\n    available_shipping_methods {\n      ...AVAILABLE_SHIPPING_METHOD_FRAGMENT\n    }\n    city\n    company\n    country {\n      code\n      label\n    }\n    custom_attributes {\n      ... on AttributeValue {\n        code\n        value\n      }\n    }\n    customer_address_uid\n    fax\n    firstname\n    lastname\n    middlename\n    postcode\n    prefix\n    region {\n      region_id\n      code\n      label\n    }\n    selected_shipping_method {\n      ...SELECTED_SHIPPING_METHOD_FRAGMENT\n    }\n    street\n    suffix\n    telephone\n    uid\n    vat_id\n  }\n\n  \n  fragment AVAILABLE_SHIPPING_METHOD_FRAGMENT on AvailableShippingMethod {\n    amount {\n      currency\n      value\n    }\n    carrier_code\n    carrier_title\n    error_message\n    method_code\n    method_title\n    price_excl_tax {\n      value\n      currency\n    }\n    price_incl_tax {\n      value\n      currency\n    }\n  }\n\n  \n  fragment SELECTED_SHIPPING_METHOD_FRAGMENT on SelectedShippingMethod {\n    amount {\n      currency\n      value\n    }\n    carrier_code\n    carrier_title\n    method_code\n    method_title\n    price_excl_tax {\n      value\n      currency\n    }\n    price_incl_tax {\n      value\n      currency\n    }\n  }\n\n";
