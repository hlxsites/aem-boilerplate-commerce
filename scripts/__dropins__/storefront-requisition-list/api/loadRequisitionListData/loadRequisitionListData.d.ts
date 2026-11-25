import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';
import { ConfigurableEnricher, ListLoadContext, ListLoadWarning, ProductDataLoader } from '../../types/list-load';
export declare const PRODUCT_DATA_BATCH_SIZE = 50;
export interface EnrichListOptions extends ListLoadContext {
    getProductData?: ProductDataLoader;
    enrichConfigurableProducts?: ConfigurableEnricher;
    skipConfigurables?: boolean;
}
export interface ListLoadResult {
    list: RequisitionList;
    warnings: ListLoadWarning[];
}
export declare function enrichListItems(input: Item[], options: EnrichListOptions): Promise<{
    items: Item[];
    warnings: ListLoadWarning[];
}>;
export declare function enrichRequisitionList(list: RequisitionList, options: EnrichListOptions): Promise<ListLoadResult>;
export type LoadListOptions = EnrichListOptions & ({
    mode: 'all';
} | {
    mode: 'page';
    currentPage: number;
    pageSize: number;
});
export declare function loadRequisitionListData(uid: string, options: LoadListOptions): Promise<ListLoadResult | null>;
