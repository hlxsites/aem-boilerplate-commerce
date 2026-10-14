import { ProductModel } from '../models/index.js';
export declare function transformProductData(data: any, options?: {
    preselectFirstOption?: boolean;
}): ProductModel | null;
