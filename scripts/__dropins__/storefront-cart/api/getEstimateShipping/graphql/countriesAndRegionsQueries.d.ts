export declare const COUNTRIES_QUERY = "\nquery COUNTRIES_QUERY {\n  countries {\n    label: full_name_locale\n    id\n  }\n  storeConfig {\n    defaultCountry: default_country\n  }\n}\n";
export declare const REGIONS_QUERY = "\nquery REGIONS_QUERY($id: String) {\n  country(id: $id) {\n    available_regions {\n      code\n\t\t\tname\n    }\n  }\n}\n";
export type CountryData = {
    label: string;
    id: string;
    available_regions?: Array<{
        code: string;
        name: string;
    }>;
    isDefaultCountry?: boolean;
};
//# sourceMappingURL=countriesAndRegionsQueries.d.ts.map