/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
import { Lang } from '@dropins/tools/i18n';
export type ConfigProps = {
    /**
     * Adobe Commerce GraphQL API URL, e.g., "https://magento.test/graphql".
     * When not set, this defaults to "/graphql".
     */
    apiUrl?: string;
    /**
     * The Payment Services drop-in may send GraphQL requests on behalf of the shopper. This requires GraphQL
     * authorization, which can be performed using authorization tokens or session cookies.
     *
     * For token-based authorization, the "getCustomerToken" function should return a customer token as a string, or null
     * for guest checkouts. The "getCustomerToken" function should not be provided for session-based authorization.
     *
     * For more information, see: https://developer.adobe.com/commerce/webapi/graphql/usage/authorization-tokens/.
     */
    getCustomerToken?: (() => string | null) | null;
    /**
     * Adobe Commerce store view code on which the Payment Services drop-in should perform GraphQL requests.
     * When not set, no 'Store' header will be sent.
     */
    storeViewCode?: string;
    /**
     * Dictionary of language definitions for the Payment Services drop-in.
     */
    langDefinitions?: Record<'default' | Lang, object>;
};
export declare const initialize: any;
export declare const config: any;
