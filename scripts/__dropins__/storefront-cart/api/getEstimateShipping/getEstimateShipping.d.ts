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
import { CountryData } from './graphql/countriesAndRegionsQueries';
export interface EstimateAddressInput {
    countryCode: string;
    postcode?: string;
    region?: {
        region?: string;
        code?: string;
        id?: number;
    };
}
export declare const getEstimateShipping: (address: EstimateAddressInput) => Promise<any | null>;
export declare const getCountries: () => Promise<[CountryData]>;
export declare const getRegions: (countryId: string) => Promise<Array<{
    code: string;
    name: string;
}>>;
