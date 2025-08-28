import { RequisitionList } from '../models/requisitionList';

export interface RawRequisitionListData {
    name: string;
    description: string;
    id: string;
    updated_at: string;
    items_count: number;
}
export declare function transformRequisitionList(data: RawRequisitionListData): RequisitionList | null;
//# sourceMappingURL=transform-requisition-list.d.ts.map