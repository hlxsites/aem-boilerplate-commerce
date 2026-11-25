export declare const MOCK_DATA_BUNDLE: {
    __typename: string;
    id: string;
    sku: string;
    name: string;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    inStock: boolean;
    addToCartAllowed: boolean;
    url: string;
    urlKey: string;
    externalId: string;
    images: {
        url: string;
        label: string;
        roles: string[];
    }[];
    options: {
        id: string;
        title: string;
        required: boolean;
        multi: null;
        values: ({
            id: string;
            title: string;
            inStock: boolean;
            __typename: string;
            quantity: number;
            isDefault: boolean;
            product: {
                sku: string;
                shortDescription: string;
                metaDescription: string;
                metaKeyword: string;
                metaTitle: string;
                name: string;
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
                    roles: string[];
                };
            };
            enabled?: undefined;
        } | {
            id: string;
            title: string;
            inStock: boolean;
            __typename: string;
            quantity: number;
            isDefault: boolean;
            enabled: boolean;
            product: {
                sku: string;
                shortDescription: string;
                metaDescription: string;
                metaKeyword: string;
                metaTitle: string;
                name: string;
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
                    roles: string[];
                };
            };
        })[];
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
            roles: string[];
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
            roles: string[];
        };
    };
};
export declare const MOCK_DATA_BUNDLE_TRANSFORMED: {
    name: string;
    sku: string;
    isBundle: boolean;
    addToCartAllowed: boolean;
    inStock: boolean;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    images: {
        url: string;
        label: string;
        width: number;
        height: number;
    }[];
    prices: {
        final: {
            amount: number;
            currency: string;
        };
        regular: {
            amount: number;
            currency: string;
        };
        visible: boolean;
    };
    options: {
        id: string;
        type: "image" | "text" | "color" | "dropdown";
        typename: "ProductViewOptionValueProduct" | "ProductViewOptionValueSwatch" | "ProductViewOptionValueConfiguration";
        label: string;
        required: boolean;
        multiple: boolean;
        items: {
            id: string;
            inStock: boolean;
            label: string;
            selected: boolean;
            value: string;
            product: {
                sku: string;
                shortDescription: string;
                metaDescription: string;
                metaKeyword: string;
                metaTitle: string;
                name: string;
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
                    roles: string[];
                };
            };
        }[];
    }[];
};
export declare const MOCK_AC_CUSTOMIZABLE_OPTIONS_RAW: {
    schemaVersion: number;
    selectable: ({
        id: string;
        label: string;
        renderType: string;
        type: string;
        required: string;
        sortOrder: string;
        values: {
            id: string;
            label: string;
            price: string;
            priceType: string;
            sku: string;
            sortOrder: string;
            isDefault: boolean;
        }[];
    } | {
        id: string;
        label: string;
        renderType: string;
        type: string;
        required: string;
        sortOrder: string;
        values: {
            id: string;
            label: string;
            price: string;
            priceType: string;
            sku: null;
            sortOrder: string;
            isDefault: boolean;
        }[];
    })[];
    shopperInput: ({
        id: string;
        label: string;
        renderType: string;
        required: string;
        price: string;
        sku: string;
        sortOrder: string;
        range: {
            to: string;
        };
        productSku: string;
    } | {
        id: string;
        label: string;
        renderType: string;
        required: string;
        price: string;
        sku: null;
        sortOrder: string;
        range: {
            to: string;
        };
        productSku: string;
    } | {
        id: string;
        label: string;
        renderType: string;
        required: string;
        sku: null;
        sortOrder: string;
        productSku: string;
        price?: undefined;
        range?: undefined;
    })[];
};
export declare const MOCK_AC_CUSTOMIZABLE_OPTIONS_TRANSFORMED: {
    schemaVersion: number;
    selectable: ({
        id: string;
        label: string;
        renderType: string;
        type: string;
        required: string;
        sortOrder: string;
        values: {
            id: string;
            label: string;
            price: number;
            priceType: string;
            sku: string;
            sortOrder: string;
            isDefault: boolean;
        }[];
    } | {
        id: string;
        label: string;
        renderType: string;
        type: string;
        required: string;
        sortOrder: string;
        values: {
            id: string;
            label: string;
            price: number;
            priceType: string;
            sku: null;
            sortOrder: string;
            isDefault: boolean;
        }[];
    })[];
    shopperInput: ({
        id: string;
        label: string;
        renderType: string;
        required: string;
        price: number;
        sku: string;
        sortOrder: string;
        range: {
            to: string;
        };
        productSku: string;
    } | {
        id: string;
        label: string;
        renderType: string;
        required: string;
        price: number;
        sku: null;
        sortOrder: string;
        range: {
            to: string;
        };
        productSku: string;
    } | {
        id: string;
        label: string;
        renderType: string;
        required: string;
        price: undefined;
        sku: null;
        sortOrder: string;
        productSku: string;
        range?: undefined;
    })[];
};
