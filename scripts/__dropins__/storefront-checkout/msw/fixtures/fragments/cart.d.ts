export declare const cartFixture: {
    __typename?: "Cart" | undefined;
    id: string;
    is_virtual: boolean;
    email?: string | null | undefined;
    total_quantity: number;
    billing_address?: {
        __typename?: "BillingCartAddress" | undefined;
        city: string;
        firstname: string;
        lastname: string;
        company?: string | null | undefined;
        postcode?: string | null | undefined;
        vat_id?: string | null | undefined;
        street: (string | null)[];
        telephone?: string | null | undefined;
        country: {
            __typename?: "CartAddressCountry" | undefined;
            code: string;
            label: string;
        };
        region?: {
            __typename?: "CartAddressRegion" | undefined;
            region_id?: number | null | undefined;
            code?: string | null | undefined;
            label?: string | null | undefined;
        } | null | undefined;
        custom_attributes: ({
            __typename?: "AttributeSelectedOptions" | undefined;
        } | {
            __typename?: "AttributeValue" | undefined;
            code: string;
            value: string;
        } | null)[];
    } | null | undefined;
    shipping_addresses: ({
        __typename?: "ShippingCartAddress" | undefined;
        firstname: string;
        lastname: string;
        company?: string | null | undefined;
        street: (string | null)[];
        city: string;
        postcode?: string | null | undefined;
        vat_id?: string | null | undefined;
        telephone?: string | null | undefined;
        region?: {
            __typename?: "CartAddressRegion" | undefined;
            region_id?: number | null | undefined;
            code?: string | null | undefined;
            label?: string | null | undefined;
        } | null | undefined;
        country: {
            __typename?: "CartAddressCountry" | undefined;
            code: string;
            label: string;
        };
        custom_attributes: ({
            __typename?: "AttributeSelectedOptions" | undefined;
        } | {
            __typename?: "AttributeValue" | undefined;
            code: string;
            value: string;
        } | null)[];
        available_shipping_methods?: ({
            __typename?: "AvailableShippingMethod" | undefined;
            available: boolean;
            carrier_code: string;
            carrier_title: string;
            error_message?: string | null | undefined;
            method_code?: string | null | undefined;
            method_title?: string | null | undefined;
            amount: {
                __typename?: "Money" | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                value?: number | null | undefined;
            };
            price_excl_tax: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
            price_incl_tax: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
        } | null)[] | null | undefined;
        selected_shipping_method?: {
            __typename?: "SelectedShippingMethod" | undefined;
            carrier_code: string;
            carrier_title: string;
            method_code: string;
            method_title: string;
            amount: {
                __typename?: "Money" | undefined;
                value?: number | null | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
            };
        } | null | undefined;
    } | null)[];
    available_payment_methods?: ({
        __typename?: "AvailablePaymentMethod" | undefined;
        code: string;
        title: string;
    } | null)[] | null | undefined;
    selected_payment_method?: {
        __typename?: "SelectedPaymentMethod" | undefined;
        code: string;
        title: string;
    } | null | undefined;
    applied_coupons?: ({
        __typename?: "AppliedCoupon" | undefined;
        code: string;
    } | null)[] | null | undefined;
    prices?: {
        __typename?: "CartPrices" | undefined;
        grand_total?: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
        } | null | undefined;
        subtotal_excluding_tax?: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
        } | null | undefined;
        subtotal_including_tax?: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
        } | null | undefined;
        applied_taxes?: ({
            __typename?: "CartTaxItem" | undefined;
            label: string;
            amount: {
                __typename?: "Money" | undefined;
                currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                value?: number | null | undefined;
            };
        } | null)[] | null | undefined;
    } | null | undefined;
    itemsV2?: {
        __typename?: "CartItems" | undefined;
        total_count: number;
        items: ({
            __typename: "BundleCartItem";
            uid: string;
            quantity: number;
            product: {
                __typename: "BundleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "ConfigurableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "DownloadableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GiftCardProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GroupedProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "SimpleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "VirtualProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            };
            prices?: {
                __typename?: "CartItemPrices" | undefined;
                fixed_product_taxes?: ({
                    __typename?: "FixedProductTax" | undefined;
                    label?: string | null | undefined;
                    amount?: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    } | null | undefined;
                } | null)[] | null | undefined;
                price: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                price_including_tax: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                row_total: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                row_total_including_tax: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                total_item_discount?: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                } | null | undefined;
            } | null | undefined;
            errors?: ({
                __typename?: "CartItemError" | undefined;
                code: import('../../../__generated__/types').CartItemErrorType;
                message: string;
            } | null)[] | null | undefined;
        } | {
            __typename: "ConfigurableCartItem";
            uid: string;
            quantity: number;
            customizable_options: ({
                __typename?: "SelectedCustomizableOption" | undefined;
                label: string;
                values: ({
                    __typename?: "SelectedCustomizableOptionValue" | undefined;
                    label: string;
                    value: string;
                } | null)[];
            } | null)[];
            configurable_options: ({
                __typename?: "SelectedConfigurableOption" | undefined;
                id: number;
                configurable_product_option_uid: string;
                option_label: string;
                configurable_product_option_value_uid: string;
                value_label: string;
                value_id: number;
            } | null)[];
            configured_variant: {
                __typename?: "BundleProduct" | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    label?: string | null | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
            } | {
                __typename?: "ConfigurableProduct" | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    label?: string | null | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
            } | {
                __typename?: "DownloadableProduct" | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    label?: string | null | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
            } | {
                __typename?: "GiftCardProduct" | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    label?: string | null | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
            } | {
                __typename?: "GroupedProduct" | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    label?: string | null | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
            } | {
                __typename?: "SimpleProduct" | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    label?: string | null | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
            } | {
                __typename?: "VirtualProduct" | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    label?: string | null | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
            };
            product: {
                __typename: "BundleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "ConfigurableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "DownloadableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GiftCardProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GroupedProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "SimpleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "VirtualProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            };
            prices?: {
                __typename?: "CartItemPrices" | undefined;
                fixed_product_taxes?: ({
                    __typename?: "FixedProductTax" | undefined;
                    label?: string | null | undefined;
                    amount?: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    } | null | undefined;
                } | null)[] | null | undefined;
                price: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                price_including_tax: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                row_total: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                row_total_including_tax: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                total_item_discount?: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                } | null | undefined;
            } | null | undefined;
            errors?: ({
                __typename?: "CartItemError" | undefined;
                code: import('../../../__generated__/types').CartItemErrorType;
                message: string;
            } | null)[] | null | undefined;
        } | {
            __typename: "DownloadableCartItem";
            uid: string;
            quantity: number;
            links?: ({
                __typename?: "DownloadableProductLinks" | undefined;
                title?: string | null | undefined;
            } | null)[] | null | undefined;
            customizable_options: ({
                __typename?: "SelectedCustomizableOption" | undefined;
                label: string;
                values: ({
                    __typename?: "SelectedCustomizableOptionValue" | undefined;
                    label: string;
                    value: string;
                } | null)[];
            } | null)[];
            product: {
                __typename: "BundleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "ConfigurableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "DownloadableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GiftCardProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GroupedProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "SimpleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "VirtualProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            };
            prices?: {
                __typename?: "CartItemPrices" | undefined;
                fixed_product_taxes?: ({
                    __typename?: "FixedProductTax" | undefined;
                    label?: string | null | undefined;
                    amount?: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    } | null | undefined;
                } | null)[] | null | undefined;
                price: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                price_including_tax: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                row_total: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                row_total_including_tax: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                total_item_discount?: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                } | null | undefined;
            } | null | undefined;
            errors?: ({
                __typename?: "CartItemError" | undefined;
                code: import('../../../__generated__/types').CartItemErrorType;
                message: string;
            } | null)[] | null | undefined;
        } | {
            __typename: "GiftCardCartItem";
            sender_name: string;
            sender_email?: string | null | undefined;
            recipient_name: string;
            recipient_email?: string | null | undefined;
            uid: string;
            quantity: number;
            customizable_options: ({
                __typename?: "SelectedCustomizableOption" | undefined;
                label: string;
                values: ({
                    __typename?: "SelectedCustomizableOptionValue" | undefined;
                    label: string;
                    value: string;
                } | null)[];
            } | null)[];
            product: {
                __typename: "BundleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "ConfigurableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "DownloadableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GiftCardProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GroupedProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "SimpleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "VirtualProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            };
            prices?: {
                __typename?: "CartItemPrices" | undefined;
                fixed_product_taxes?: ({
                    __typename?: "FixedProductTax" | undefined;
                    label?: string | null | undefined;
                    amount?: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    } | null | undefined;
                } | null)[] | null | undefined;
                price: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                price_including_tax: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                row_total: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                row_total_including_tax: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                total_item_discount?: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                } | null | undefined;
            } | null | undefined;
            errors?: ({
                __typename?: "CartItemError" | undefined;
                code: import('../../../__generated__/types').CartItemErrorType;
                message: string;
            } | null)[] | null | undefined;
        } | {
            __typename: "SimpleCartItem";
            uid: string;
            quantity: number;
            customizable_options: ({
                __typename?: "SelectedCustomizableOption" | undefined;
                label: string;
                values: ({
                    __typename?: "SelectedCustomizableOptionValue" | undefined;
                    label: string;
                    value: string;
                } | null)[];
            } | null)[];
            product: {
                __typename: "BundleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "ConfigurableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "DownloadableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GiftCardProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GroupedProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "SimpleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "VirtualProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            };
            prices?: {
                __typename?: "CartItemPrices" | undefined;
                fixed_product_taxes?: ({
                    __typename?: "FixedProductTax" | undefined;
                    label?: string | null | undefined;
                    amount?: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    } | null | undefined;
                } | null)[] | null | undefined;
                price: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                price_including_tax: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                row_total: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                row_total_including_tax: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                total_item_discount?: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                } | null | undefined;
            } | null | undefined;
            errors?: ({
                __typename?: "CartItemError" | undefined;
                code: import('../../../__generated__/types').CartItemErrorType;
                message: string;
            } | null)[] | null | undefined;
        } | {
            __typename: "VirtualCartItem";
            uid: string;
            quantity: number;
            customizable_options: ({
                __typename?: "SelectedCustomizableOption" | undefined;
                label: string;
                values: ({
                    __typename?: "SelectedCustomizableOptionValue" | undefined;
                    label: string;
                    value: string;
                } | null)[];
            } | null)[];
            product: {
                __typename: "BundleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "ConfigurableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "DownloadableProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GiftCardProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "GroupedProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "SimpleProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            } | {
                __typename: "VirtualProduct";
                uid: string;
                name?: string | null | undefined;
                sku?: string | null | undefined;
                url_key?: string | null | undefined;
                stock_status?: import('../../../__generated__/types').ProductStockStatus | null | undefined;
                only_x_left_in_stock?: number | null | undefined;
                thumbnail?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                    label?: string | null | undefined;
                } | null | undefined;
                small_image?: {
                    __typename?: "ProductImage" | undefined;
                    url?: string | null | undefined;
                } | null | undefined;
                price_range: {
                    __typename?: "PriceRange" | undefined;
                    maximum_price?: {
                        __typename?: "ProductPrice" | undefined;
                        regular_price: {
                            __typename?: "Money" | undefined;
                            currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                            value?: number | null | undefined;
                        };
                    } | null | undefined;
                };
            };
            prices?: {
                __typename?: "CartItemPrices" | undefined;
                fixed_product_taxes?: ({
                    __typename?: "FixedProductTax" | undefined;
                    label?: string | null | undefined;
                    amount?: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    } | null | undefined;
                } | null)[] | null | undefined;
                price: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                price_including_tax: {
                    __typename?: "Money" | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                    value?: number | null | undefined;
                };
                row_total: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                row_total_including_tax: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                };
                total_item_discount?: {
                    __typename?: "Money" | undefined;
                    value?: number | null | undefined;
                    currency?: import('../../../__generated__/types').CurrencyEnum | null | undefined;
                } | null | undefined;
            } | null | undefined;
            errors?: ({
                __typename?: "CartItemError" | undefined;
                code: import('../../../__generated__/types').CartItemErrorType;
                message: string;
            } | null)[] | null | undefined;
        } | null)[];
    } | null | undefined;
} | null | undefined;
//# sourceMappingURL=cart.d.ts.map