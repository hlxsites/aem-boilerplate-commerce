import { AttributesFormModel } from '../data/models';

export declare const getFieldsConfig: (itemValues: Record<string, any>, attributesFormList: AttributesFormModel[]) => {
    code?: string | undefined;
    name?: string | undefined;
    id?: string | undefined;
    required?: boolean | undefined;
    label?: string | undefined;
    options?: {
        is_default: boolean;
        label: string;
        value: string;
    }[] | undefined;
    entityType?: string | undefined;
    className?: string | undefined;
    defaultValue?: string | number | boolean | undefined;
    fieldType?: import('../data/models').FieldEnumList | undefined;
    multilineCount?: number | undefined;
    isUnique?: boolean | undefined;
    orderNumber: number;
    isHidden?: boolean | undefined;
    customUpperCode: string;
    validateRules: Record<string, string>[];
}[];
//# sourceMappingURL=getFieldsConfig.d.ts.map