export interface OptionValidationRule {
    type: 'string' | 'number' | 'email';
    required: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    values?: number[] | string[];
}
export interface Option {
    name: string;
    uid: string;
    label: string;
    validationRule: OptionValidationRule;
}
export interface OptionField {
    id: string;
    value: string;
}
export interface ValuesModel {
    sku: string;
    quantity: number;
    optionsUIDs?: string[];
    /** Per bundle option value UID quantities (cart `entered_options`). */
    bundleOptionQuantities?: Record<string, number>;
    enteredOptions?: Array<{
        uid: string;
        value: string;
    }>;
}
//# sourceMappingURL=values-model.d.ts.map