export interface AttributesFormItemsProps {
    code: string;
    name: string;
    id: string;
    defaultValue: string;
    entity_type: string;
    className: null | string;
    fieldType: string;
    required: boolean;
    is_unique: boolean;
    label: string;
    orderNumber: number;
    options: {
        is_default: boolean;
        label: string;
        value: string;
    }[];
}
export interface AttributesFormModel {
    fields?: AttributesFormItemsProps[];
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=attributes-form.d.ts.map