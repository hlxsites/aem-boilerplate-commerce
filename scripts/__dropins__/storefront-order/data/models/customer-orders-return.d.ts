import { OrderItemModel } from './order-details';

export interface OrdersReturnItemsProps {
    orderItem: OrderItemModel;
    quantity: number;
    requestQuantity: number;
    status: string;
    uid: string;
}
export interface OrdersReturnTrackingProps {
    status: {
        text: string;
        type: string;
    };
    carrier: {
        uid: string;
        label: string;
    };
    trackingNumber: string;
}
export interface OrdersReturnProps {
    token: string;
    orderNumber: string;
    tracking: OrdersReturnTrackingProps[];
    items: OrdersReturnItemsProps[];
}
export interface PageInfoProps {
    pageSize: number;
    totalPages: number;
    currentPage: number;
}
export interface CustomerOrdersReturnModel {
    ordersReturn: OrdersReturnProps[];
    pageInfo: PageInfoProps;
}
//# sourceMappingURL=customer-orders-return.d.ts.map