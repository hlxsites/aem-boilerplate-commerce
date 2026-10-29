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
import { Cart as CartModel, Customer as CustomerModel, ShippingMethod } from '../../data/models';
import { Filter, Selector } from '../../types/utils';
import { definition } from '../../../node_modules/@dropins/tools/src/i18n';
import { Initializer, Model } from '../../../node_modules/@dropins/tools/src/lib';
export type ConfigProps = {
    defaults?: {
        isBillToShipping?: boolean;
        selectedShippingMethod?: Selector<ShippingMethod>;
    };
    shipping?: {
        filterOptions?: Filter<ShippingMethod>;
    };
    features?: {
        b2b?: {
            quotes?: boolean;
            routeLogin?: () => string | void;
        };
    };
    langDefinitions?: typeof definition & {
        default: {
            Checkout: any;
        };
    };
    models?: {
        CartModel?: Model<CartModel>;
        CustomerModel?: Model<CustomerModel>;
        EstimateShippingModel?: Model<ShippingMethod[]>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("../../../node_modules/@dropins/tools/src/lib").Config<ConfigProps>;
