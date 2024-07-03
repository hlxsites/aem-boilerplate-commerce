export declare const useEstimatedShipping: () => {
    loading: boolean;
    regionsLoading: boolean;
    estimatedDestinationText: string;
    countries: {
        text: string;
        value: string;
    }[];
    selectedCountry: string;
    selectedRegion: string;
    selectedZip: string;
    regions: {
        text: string;
        value: string;
    }[];
    estimatedShippingPrice: any;
    estimatedShippingMethod: any;
    handleEstimateShipping: (formValues: {
        shippingCountry: string;
        shippingState?: string;
        shippingZip?: string;
    }) => Promise<any>;
    handleCountrySelected: (event: Event) => void;
};
//# sourceMappingURL=useEstimatedShipping.d.ts.map