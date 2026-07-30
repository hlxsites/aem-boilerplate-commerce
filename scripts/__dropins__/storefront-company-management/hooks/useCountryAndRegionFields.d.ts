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
import { CompanyFormData } from '../data/models/company';
interface UseCountryAndRegionFieldsOptions {
    defaultCountry?: string;
    formName?: string;
}
export declare const useCountryAndRegionFields: (options?: UseCountryAndRegionFieldsOptions) => {
    countryOptions: Country[];
    regionOptions: any[];
    isRequiredRegion: boolean;
    isRequiredPostCode: boolean;
    disableField: boolean;
    loadingCountries: boolean;
    hasRegions: boolean;
    handleInputChange: (field: keyof CompanyFormData, value: string | string[]) => void;
    inputChange: CompanyFormData;
};
export {};
