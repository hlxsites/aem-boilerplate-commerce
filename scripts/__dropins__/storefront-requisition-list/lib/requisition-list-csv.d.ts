import { Item } from '../data/models/item';
export declare function serializeRequisitionListCsv(items: Pick<Item, 'sku' | 'quantity'>[]): string;
export declare function requisitionListCsvFilename(name: string): string;
export declare function downloadRequisitionListCsv(name: string, items: Pick<Item, 'sku' | 'quantity'>[]): void;
