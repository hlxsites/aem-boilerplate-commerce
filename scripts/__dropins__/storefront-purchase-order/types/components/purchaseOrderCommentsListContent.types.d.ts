import { PurchaseOrderModel } from '../../data/models';
export interface PurchaseOrderCommentsListContentProps {
    commentsList: PurchaseOrderModel['comments'] | [];
    visibleRecordsLimit: number;
}
