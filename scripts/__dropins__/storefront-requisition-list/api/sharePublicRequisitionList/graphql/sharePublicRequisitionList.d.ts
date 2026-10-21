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
export declare const SHARE_PUBLIC_REQUISITION_LIST_MUTATION = "\n  mutation SHARE_PUBLIC_REQUISITION_LIST_MUTATION($input: SharePublicRequisitionListInput!) {\n    sharePublicRequisitionList(input: $input) {\n      sent_count\n      user_errors { code message }\n    }\n  }\n";
