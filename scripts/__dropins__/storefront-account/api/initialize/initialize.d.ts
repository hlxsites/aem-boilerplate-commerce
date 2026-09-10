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
import { Initializer, Model } from '@dropins/tools/lib';
import { Lang } from '@dropins/tools/i18n';
import { OrderHistoryModel } from '../../data/models';
import { CustomerDataModelShort } from '../../data/models/customer';
type ConfigProps = {
    langDefinitions?: Lang;
    authHeaderConfig?: {
        header?: string;
        tokenPrefix?: string;
    };
    models?: {
        OrderHistoryModel?: Model<OrderHistoryModel>;
        CustomerDataModelShort?: Model<CustomerDataModelShort>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
