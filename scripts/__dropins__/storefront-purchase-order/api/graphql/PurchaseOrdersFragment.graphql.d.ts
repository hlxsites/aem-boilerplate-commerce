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
export declare const PURCHASE_ORDERS_FRAGMENT = "\n  fragment PURCHASE_ORDERS_FRAGMENT on PurchaseOrder {\n    __typename\n    uid\n    number\n    status\n    available_actions\n    approval_flow {\n      rule_name\n      events {\n        message\n        name\n        role\n        status\n        updated_at\n      }\n    }\n    comments {\n      created_at\n      author {\n        firstname\n        lastname\n        email\n      }\n      text\n    }\n    created_at\n    updated_at\n    created_by {\n      firstname\n      lastname\n      email\n    }\n    history_log {\n      activity\n      created_at\n      message\n      uid\n    }\n    order {\n      number\n    }\n    quote {\n      id\n      prices {\n        grand_total {\n          value\n          currency\n        }\n      }\n      itemsV2 {\n        items {\n          uid\n          quantity\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=PurchaseOrdersFragment.graphql.d.ts.map