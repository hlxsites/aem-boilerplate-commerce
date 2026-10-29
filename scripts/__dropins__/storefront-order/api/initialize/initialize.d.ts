/********************************************************************
 * ADOBE CONFIDENTIAL
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
import { Initializer, Model } from '../../../node_modules/@dropins/tools/src/lib';
import { Lang } from '../../../node_modules/@dropins/tools/src/i18n';
import { CustomerOrdersReturnModel, OrderDataModel, RequestReturnModel } from '../../data/models';
export type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        OrderDataModel?: Model<OrderDataModel>;
        CustomerOrdersReturnModel?: Model<CustomerOrdersReturnModel>;
        RequestReturnModel?: Model<RequestReturnModel>;
    };
    orderRef?: string;
    returnRef?: string;
    orderData?: OrderDataModel | null;
    routeOrdersList?: () => string;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("../../../node_modules/@dropins/tools/src/lib").Config<ConfigProps>;
