import { Item } from '../data/models/item';
import { ListLoadContext, ListLoadWarning } from '../types/list-load';
export declare function isUsableSku(sku: unknown): sku is string;
export declare function reportLoadWarning(context: ListLoadContext, stage: ListLoadWarning['stage'], code: ListLoadWarning['code'], items: Item[]): void;
