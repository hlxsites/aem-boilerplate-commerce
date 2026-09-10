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
import { ReadonlySignal } from '@dropins/tools/lib/signals';
export declare enum QueueName {
    Updates = "updates",
    Default = "default",
    ShippingEstimate = "shippingEstimate"
}
type Request<T> = () => Promise<T>;
export declare function enqueueRequest<T>(requestFn: Request<T>, name?: QueueName): Promise<T>;
export declare const hasPendingUpdates: ReadonlySignal<boolean>;
export declare const hasPendingShippingEstimate: ReadonlySignal<boolean>;
export {};
