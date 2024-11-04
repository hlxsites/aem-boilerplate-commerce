import { HTMLAttributes } from 'preact/compat';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { OrderDataModel, OrderItemModel, OrdersReturnPropsModel, OrdersReturnTrackingProps } from '../data/models';

type routeTypes = {
    returnNumber?: string;
    token?: string;
    orderNumber?: string;
};
export interface ShippingStatusProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    collapseThreshold?: number;
    slots?: {
        DeliveryTimeLine?: SlotProps;
        DeliveryTrackActions?: SlotProps;
        ReturnItemsDetails?: SlotProps;
    };
    routeReturnDetails?: ({ returnNumber, token, orderNumber, }: routeTypes) => string;
    routeOrderDetails?: ({ returnNumber, token, orderNumber, }: routeTypes) => string;
    routeProductDetails?: (orderItem?: OrderItemModel) => string;
    routeTracking?: (track: OrdersReturnTrackingProps) => string;
}
export interface UseShippingStatusProps {
    orderData?: OrderDataModel;
}
export interface ShippingStatusCardProps extends ShippingStatusProps {
    translations: Record<string, string>;
}
export interface ShippingStatusOrderCardProps extends ShippingStatusCardProps {
    collapseThreshold: number;
    orderReturn: OrdersReturnPropsModel[];
}
export {};
//# sourceMappingURL=shippingStatus.types.d.ts.map