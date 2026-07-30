import { PurchaseOrderModel } from '../../data/models';
export interface PurchaseOrderCommentFormContentProps {
    t: Record<string, string>;
    purchaseOrderData: PurchaseOrderModel | null;
}
