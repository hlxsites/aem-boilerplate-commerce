import { RawRequisitionListData } from '../../data/transforms/transform-requisition-list';
export declare function fetchRequisitionListPage(uid: string, currentPage?: number, pageSize?: number, signal?: AbortSignal): Promise<RawRequisitionListData | null>;
