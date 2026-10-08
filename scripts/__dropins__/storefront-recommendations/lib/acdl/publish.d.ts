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
import { RecommendationUnitModel } from '../../data/models/recommendations-model.js';
/**
 * Parameters for the publish events
 *
 * item: The item that was added to the cart
 * pagePlacement: The placement of the item on the page
 * yOffsetTop: The y offset of the item from the top of the page
 * yOffsetBottom: The y offset of the item from the bottom of the page
 */
export interface PublishParams {
    recommendationUnit: RecommendationUnitModel;
    pagePlacement: string;
    yOffsetTop: number;
    yOffsetBottom: number;
    backupProducts?: number;
    searchTime?: number;
    productId?: number;
}
/**
 * Publish a recs-unit-render event to the Adobe Client Data Layer (ACDL)
 *
 * See: https://experienceleague.adobe.com/en/docs/commerce/product-recommendations/developer/events#events
 * @param params - The parameters for the event
 */
export declare const publishRecsUnitRender: (params: PublishParams) => void;
/**
 * Publish a recs-item-click event to the Adobe Client Data Layer (ACDL)
 *
 * See: https://experienceleague.adobe.com/en/docs/commerce/product-recommendations/developer/events#events
 * @param params - The parameters for the event
 */
export declare const publishRecsItemClick: (params: PublishParams) => void;
/**
 * Publish a recs-unit-view event to the Adobe Client Data Layer (ACDL)
 *
 * See: https://experienceleague.adobe.com/en/docs/commerce/product-recommendations/developer/events#events
 * @param params - The parameters for the event
 */
export declare const publishRecsUnitView: (params: PublishParams) => void;
/**
 * Publish a recs-api-request-sent event to the Adobe Client Data Layer (ACDL)
 *
 * See: https://experienceleague.adobe.com/en/docs/commerce/product-recommendations/developer/events#events
 */
export declare const publishRecsApiRequestSent: () => void;
/**
 * Publish a recs-api-response-received event to the Adobe Client Data Layer (ACDL)
 *
 * See: https://experienceleague.adobe.com/en/docs/commerce/product-recommendations/developer/events#events
 * @param params - The parameters for the event
 */
export declare const publishRecsApiResponseReceived: (params: PublishParams) => void;
