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
import { ValuesModel } from '../data/models';
export declare const initialValues: ValuesModel;
/**
 * Emits a checkout/values event with the provided values
 * Merges with previous values if they exist
 *
 * @param values - Partial values to be emitted or merged with existing values
 */
export declare function notifyValues(values: Partial<ValuesModel>): void;
/**
 * Retrieves a specific value from the ValuesModel by key
 * @param key - The key of the ValuesModel to retrieve
 * @returns The value for the specified key or null if not defined/found
 */
export declare function getValue<K extends keyof ValuesModel>(key: K): ValuesModel[K] | null;
