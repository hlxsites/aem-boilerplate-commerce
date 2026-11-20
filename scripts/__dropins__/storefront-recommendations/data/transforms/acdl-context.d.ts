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
import { RecommendationUnit } from '../models/acdl-models';
import { RecommendationUnitModel } from '../models/index.js';
/**
 * Transform a recommendation unit data object into an ACDL model
 *
 * @param unitData - The recommendation unit data object to transform
 * @param additionalData - Additional data that may not be present in the unit data object
 * @returns The transformed recommendation unit
 */
export declare const transformRecommendationUnit: (unitData: RecommendationUnitModel, additionalData?: any) => RecommendationUnit;
