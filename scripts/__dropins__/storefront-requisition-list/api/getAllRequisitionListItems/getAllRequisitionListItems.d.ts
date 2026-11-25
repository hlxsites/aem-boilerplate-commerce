import { RequisitionList } from '../../data/models/requisitionList';
import { ListLoadContext } from '../../types/list-load';
export declare function getAllRequisitionListItems(uid: string, signal?: AbortSignal, onProgress?: ListLoadContext['onProgress']): Promise<RequisitionList>;
