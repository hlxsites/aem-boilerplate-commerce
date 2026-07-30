import type { Country } from '../data/models';
interface UseCountriesResult {
    countryOptions: Country[];
    regionOptions: {
        text: string;
        value: string;
    }[];
    isRegionRequired: boolean;
    hasRegionOptions: boolean;
    loadingCountries: boolean;
}
export declare const useCountries: (selectedCountryCode: string | undefined) => UseCountriesResult;
export {};
