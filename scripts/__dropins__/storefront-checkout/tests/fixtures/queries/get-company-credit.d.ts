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
import { GetCompanyCreditQuery } from '../../../__generated__/types';
/**
 * Standard company credit fixture with $1000 available credit
 * Use this for normal scenarios where credit limit is not exceeded
 */
export declare const getCompanyCreditFixture: GetCompanyCreditQuery;
/**
 * Company credit fixture with $500 available credit
 * Use this for scenarios where credit limit is exceeded (when cart amount > $500)
 * The MSW handler will use this fixture when sessionStorage has 'useExceedLimitFixture' set to 'true'
 */
export declare const getCompanyCreditExceedLimitFixture: GetCompanyCreditQuery;
