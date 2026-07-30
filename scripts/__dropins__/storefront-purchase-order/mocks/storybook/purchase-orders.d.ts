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
export declare const mockCompanyPurchaseOrdersData: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: ({
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order: null;
                    quote: {
                        prices: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                } | {
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order: {
                        id: string;
                        number: string;
                        total: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                    quote: null;
                })[];
            };
        };
    };
};
export declare const mockPurchaseOrdersData: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: ({
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order: {
                        id: string;
                        number: string;
                        total: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                    quote: null;
                } | {
                    uid: string;
                    number: string;
                    status: string;
                    created_at: string;
                    updated_at: string;
                    available_actions: string[];
                    created_by: {
                        firstname: string;
                        lastname: string;
                        email: string;
                    };
                    order: null;
                    quote: {
                        prices: {
                            grand_total: {
                                value: number;
                                currency: string;
                            };
                        };
                    };
                })[];
            };
        };
    };
};
export declare const mockPurchaseOrdersEmpty: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: never[];
            };
        };
    };
};
export declare const mockPurchaseOrdersLoading: {
    data: {
        customer: {
            purchase_orders: {
                total_count: number;
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                items: never[];
            };
        };
    };
};
export declare const mockPurchaseOrdersError: {
    errors: {
        message: string;
        extensions: {
            category: string;
        };
    }[];
};
export declare const purchaseOrderHandlers: import("msw").GraphQLHandler[];
export declare const purchaseOrderLoadingHandlers: import("msw").GraphQLHandler[];
export declare const purchaseOrderEmptyHandlers: import("msw").GraphQLHandler[];
export declare const purchaseOrderErrorHandlers: import("msw").GraphQLHandler[];
export declare const purchaseOrderPaginationHandlers: import("msw").GraphQLHandler[];
export declare const companyPurchaseOrderPaginationHandlers: import("msw").GraphQLHandler[];
export declare const storybookHandlers: import("msw").GraphQLHandler[];
