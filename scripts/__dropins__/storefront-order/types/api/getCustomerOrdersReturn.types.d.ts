import { OrderItemProps } from './getOrderDetails.types';

export interface GetCustomerOrdersReturnResponse {
    data: {
        customer: {
            returns: {
                page_info: {
                    page_size: number;
                    total_pages: number;
                    current_page: number;
                };
                items: {
                    number: number;
                    order: {
                        number: string;
                        token: string;
                    };
                    shipping: {
                        tracking: {
                            status: {
                                text: string;
                                type: string;
                            };
                            carrier: {
                                uid: string;
                                label: string;
                            };
                            tracking_number: string;
                        }[];
                    };
                    items: {
                        quantity: number;
                        status: string;
                        uid: string;
                        request_quantity: number;
                        order_item: OrderItemProps;
                    }[];
                }[];
            };
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomerOrdersReturn.types.d.ts.map