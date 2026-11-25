import { Item, Product } from '../data/models/item';
export interface ListLoadProgress {
    stage: 'list' | 'configurables' | 'products';
    completed: number;
    total: number | null;
    unit: 'pages' | 'lines' | 'batches';
}
export interface ListLoadWarning {
    stage: 'configurables' | 'products';
    code: 'request-failed' | 'data-unavailable' | 'price-unavailable' | 'invalid-enrichment';
    itemUids: string[];
    skus: string[];
}
export interface ListLoadContext {
    signal?: AbortSignal;
    onProgress?: (progress: ListLoadProgress) => void;
    onWarning?: (warning: ListLoadWarning) => void;
}
export type ProductDataLoader = (skus: string[], context?: ListLoadContext) => Promise<Product[] | null>;
export type ConfigurableEnricher = (items: Item[], context?: ListLoadContext) => Promise<Item[]>;
