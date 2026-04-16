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
export declare const CREATE_PAYMENT_ORDER_FOR_VAULT = "\n  mutation CreatePaymentOrderForVault($input: CreatePaymentOrderInput!) {\n    createPaymentOrder(input: $input) {\n      id\n      mp_order_id\n      status\n    }\n  }\n";
//# sourceMappingURL=createPaymentOrderForVault.graphql.d.ts.map