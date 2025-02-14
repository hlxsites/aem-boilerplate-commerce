export declare const products: ({
    product: {
        sku: string;
        name: string;
        canonical_url: string;
    };
    productView: {
        __typename: string;
        sku: string;
        name: string;
        url: string;
        urlKey: string;
        images: {
            label: string;
            url: string;
        }[];
        price: {
            final: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
            regular: {
                amount: {
                    value: number;
                    currency: string;
                };
            };
        };
    };
    highlights: {
        attribute: string;
        value: string;
        matched_words: never[];
    }[];
} | {
    product: {
        sku: string;
        name: string;
        canonical_url: string;
    };
    productView: {
        __typename: string;
        sku: string;
        name: string;
        url: string;
        urlKey: string;
        images: {
            label: string;
            url: string;
        }[];
        priceRange: {
            maximum: {
                final: {
                    amount: {
                        value: number;
                        currency: string;
                    };
                };
                regular: {
                    amount: {
                        value: number;
                        currency: string;
                    };
                };
            };
            minimum: {
                final: {
                    amount: {
                        value: number;
                        currency: string;
                    };
                };
                regular: {
                    amount: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
        options: {
            id: string;
            title: string;
            values: {
                title: string;
                id: string;
                type: string;
                value: string;
            }[];
        }[];
    };
    highlights: {
        attribute: string;
        value: string;
        matched_words: never[];
    }[];
})[];
//# sourceMappingURL=MockData.d.ts.map