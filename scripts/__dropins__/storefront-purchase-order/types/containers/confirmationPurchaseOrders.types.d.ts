import { HTMLAttributes } from 'preact/compat';

export interface ConfirmationPurchaseOrdersProps extends HTMLAttributes<HTMLDivElement> {
    orderNumber: string | number;
    routePurchaseOrderDetails: () => string;
    routeContinueShopping: () => string;
}
//# sourceMappingURL=confirmationPurchaseOrders.types.d.ts.map