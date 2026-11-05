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
import { VariantWithQuantity, VariantTableData } from '../types/index.js';
/**
 * Collects and transforms variant data with quantities into table data format
 * @param variants - Array of variants with quantities
 * @returns Array of collected variant data with optional optionsUIDs and parentSku
 */
export declare const collectVariantsData: (variants: VariantWithQuantity[]) => VariantTableData[];
