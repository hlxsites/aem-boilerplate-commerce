import { RequisitionList } from '../models/requisitionList';
import { Item } from '../models/item';

export interface RawRequisitionListData {
    name: string;
    description: string;
    uid: string;
    updated_at: string;
    items_count: number;
    items: {
        items: Item[];
        page_info: {
            total_pages: number;
            current_page: number;
            page_size: number;
        };
    };
}
export declare function transformRequisitionList(data: RawRequisitionListData): RequisitionList | null;
//# sourceMappingURL=transform-requisition-list.d.ts.map