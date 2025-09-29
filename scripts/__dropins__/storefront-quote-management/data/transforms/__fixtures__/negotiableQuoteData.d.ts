import { NegotiableQuoteModel, NegotiableQuoteStatus } from '../../models/negotiable-quote-model';

export declare const mockGraphQLResponse: {
    data: {
        requestNegotiableQuote: {
            quote: {
                uid: string;
                name: string;
                created_at: string;
                updated_at: string;
                status: string;
                buyer: {
                    firstname: string;
                    lastname: string;
                };
                comments: {
                    uid: string;
                    created_at: string;
                    author: {
                        firstname: string;
                        lastname: string;
                    };
                }[];
                items: {
                    product: {
                        uid: string;
                        sku: string;
                        name: string;
                        price_range: {
                            maximum_price: {
                                regular_price: {
                                    value: number;
                                };
                            };
                        };
                    };
                    quantity: number;
                }[];
                prices: {
                    subtotal_excluding_tax: {
                        value: number;
                    };
                    subtotal_including_tax: {
                        value: number;
                    };
                    subtotal_with_discount_excluding_tax: {
                        value: number;
                    };
                    grand_total: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
    };
};
export declare const expectedTransformedQuote: NegotiableQuoteModel;
export declare const mockNegotiableQuotesResponse: {
    data: {
        negotiableQuotes: {
            items: {
                uid: string;
                name: string;
                created_at: string;
                updated_at: string;
                status: NegotiableQuoteStatus;
                buyer: {
                    firstname: string;
                    lastname: string;
                };
                items: {
                    product: {
                        uid: string;
                        sku: string;
                        name: string;
                        template_id: string;
                        template_name: string;
                        price_range: {
                            maximum_price: {
                                regular_price: {
                                    value: number;
                                };
                            };
                        };
                    };
                    quantity: number;
                }[];
                prices: {
                    subtotal_excluding_tax: {
                        value: number;
                    };
                    subtotal_including_tax: {
                        value: number;
                    };
                    subtotal_with_discount_excluding_tax: {
                        value: number;
                    };
                    grand_total: {
                        value: number;
                    };
                };
            }[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
};
export declare const mockEmptyNegotiableQuotesResponse: {
    data: {
        negotiableQuotes: {
            items: never[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
};
export declare const mockNullNegotiableQuotesResponse: {
    data: {
        negotiableQuotes: null;
    };
};
//# sourceMappingURL=negotiableQuoteData.d.ts.map