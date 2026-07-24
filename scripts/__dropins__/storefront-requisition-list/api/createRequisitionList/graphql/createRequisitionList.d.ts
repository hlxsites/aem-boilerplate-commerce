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
export declare const CREATE_REQUISITION_LIST_MUTATION = "\n  mutation CREATE_REQUISITION_LIST_MUTATION(\n      $requisitionListName: String!,\n      $requisitionListDescription: String,\n    ) {\n    createRequisitionList(\n      input: {\n        name: $requisitionListName\n        description: $requisitionListDescription\n      }\n    ) {\n      requisition_list {\n        ...REQUISITION_LIST_FRAGMENT\n      }\n    }\n  }\n\nfragment REQUISITION_LIST_FRAGMENT on RequisitionList {\n    uid\n    name\n    description\n    items_count\n    updated_at\n  }\n\n";
