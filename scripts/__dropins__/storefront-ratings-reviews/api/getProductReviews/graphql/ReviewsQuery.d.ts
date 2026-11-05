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
export declare const REVIEWS_QUERY = "\nquery REVIEWS_QUERY($sku: String!, $pageSize: Int, $currentPage: Int) {\n  reviews(sku: $sku, pageSize: $pageSize, currentPage: $currentPage) {\n    items {\n      nickname\n      summary\n      text\n      average_rating\n      created_at\n      ratings_breakdown { name value }\n    }\n    page_info { current_page page_size total_pages }\n  }\n}\n";
