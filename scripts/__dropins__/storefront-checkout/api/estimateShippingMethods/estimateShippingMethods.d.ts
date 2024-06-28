import { ShippingMethod } from '../../data/models';

export interface ShippingEstimationCriteria {
    country_code: string;
    region_name?: string;
    region_id?: string | number;
    zip?: string;
}
export type EstimateShippingInput = {
    cartId: string;
    criteria: ShippingEstimationCriteria;
};
export declare const estimateShippingMethods: (input: EstimateShippingInput) => Promise<ShippingMethod[] | undefined>;
//# sourceMappingURL=estimateShippingMethods.d.ts.map