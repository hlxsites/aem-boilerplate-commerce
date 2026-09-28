import { CartModel } from '../data/models';
type BackorderTextItem = Pick<CartModel['items'][number], 'backorderMessage' | 'insufficientQuantity' | 'outOfStock'>;
export declare function getBackorderText(item: BackorderTextItem): string | undefined;
export {};
