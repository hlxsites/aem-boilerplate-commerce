import { Option } from '../data/models';

export type BundleOptionQuantities = Record<string, number>;
export declare function readCanEditQuantity(value: Record<string, unknown>): boolean;
export declare function readDefaultOptionQuantity(value: Record<string, unknown>): number;
export declare function buildBundleOptionQuantitiesFromOptions(options: Option[] | undefined, optionUIDs: string[] | undefined): BundleOptionQuantities;
export declare function mergeBundleOptionQuantities(previous: BundleOptionQuantities | undefined, options: Option[] | undefined, optionUIDs: string[] | undefined): BundleOptionQuantities;
export declare function bundleOptionQuantitiesToEnteredOptions(quantities: BundleOptionQuantities | undefined): Array<{
    uid: string;
    value: string;
}>;
export declare function bundleOptionQuantitiesFromEnteredOptions(enteredOptions: Array<{
    uid: string;
    value: string;
}> | undefined): BundleOptionQuantities;
//# sourceMappingURL=bundle-option-quantities.d.ts.map