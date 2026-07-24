import { PurchaseOrderModel } from '../../data/models';
export interface HistoryLogContentProps {
    historyLogList: PurchaseOrderModel['historyLog'];
    visibleRecordsLimit: number;
}
