export interface CountriesFormResponse {
    data: {
        countries: {
            two_letter_abbreviation: string;
            full_name_locale: string;
            available_regions: {
                code: string;
            }[] | null;
        }[];
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCountries.types.d.ts.map