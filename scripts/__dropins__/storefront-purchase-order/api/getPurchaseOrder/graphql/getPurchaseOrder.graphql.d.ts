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
export declare const GET_PURCHASE_ORDER = "\n  query GET_PURCHASE_ORDER($uid: ID!) {\n    customer {\n      purchase_order(uid: $uid) {\n        uid\n        number\n        created_at\n        updated_at\n        status\n        available_actions\n        created_by {\n          firstname\n          lastname\n          email\n        }\n        order {\n          id\n          number\n          total {\n            grand_total {\n              value\n              currency\n            }\n          }\n        }\n        quote {\n          prices {\n            grand_total {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getPurchaseOrder.graphql.d.ts.map