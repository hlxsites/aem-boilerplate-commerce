/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare const NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT = "\n  fragment NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT on NegotiableQuoteShippingAddress {\n    uid\n    customer_address_uid\n    company_address_id\n    firstname\n    lastname\n    company\n    street\n    city\n    region {\n      code\n      label\n      region_id\n    }\n    postcode\n    country {\n      code\n      label\n    }\n    telephone\n\n    selected_shipping_method {\n      ...SELECTED_SHIPPING_METHOD_FRAGMENT\n    }\n  }\n\n  \n  fragment SELECTED_SHIPPING_METHOD_FRAGMENT on SelectedShippingMethod {\n    amount {\n      currency\n      value\n    }\n    carrier_code\n    carrier_title\n    method_code\n    method_title\n    price_excl_tax {\n      value\n      currency\n    }\n    price_incl_tax {\n      value\n      currency\n    }\n  }\n\n";
