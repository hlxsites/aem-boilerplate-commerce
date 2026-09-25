import { ProductModel } from '../data/models';
import { ValuesModel } from '../data/models/values-model';

export interface UseProductDataOptions {
    scope?: string;
    initialData?: ProductModel | null;
    initialValues?: Partial<ValuesModel>;
}
export interface UseProductDataResult {
    data: ProductModel | null;
    values: ValuesModel;
}
/**
 * Custom hook for subscribing to PDP data and values events.
 * Provides a reusable way to access product data and configuration values
 * across container components.
 */
export declare function useProductData({ scope, initialData, initialValues, }?: UseProductDataOptions): UseProductDataResult;
export interface AttributeResult<T = any> {
    id: string;
    label: string;
    value: T;
}
/**
 * Utility function to find and parse all attributes by their ID from product data.
 * Returns an array of all matching attributes.
 * Handles JSON parsing of attribute values and provides type safety.
 * If JSON parsing fails, returns the attribute with the raw value or a default empty structure.
 */
export declare function getAttributesById<T = any>(data: ProductModel | null, attributeId: string): AttributeResult<T>[];
//# sourceMappingURL=useProductData.d.ts.map