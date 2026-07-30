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
export declare const IMPORT_SHARED_REQUISITION_LIST_MUTATION = "\n  mutation IMPORT_SHARED_REQUISITION_LIST_MUTATION($token: String!) {\n    importSharedRequisitionList(token: $token) {\n      requisition_list {\n        ...REQUISITION_LIST_FRAGMENT\n      }\n      user_errors {\n        message\n        code\n      }\n    }\n  }\n\nfragment REQUISITION_LIST_FRAGMENT on RequisitionList {\n    uid\n    name\n    description\n    items_count\n    updated_at\n  }\n\n";
