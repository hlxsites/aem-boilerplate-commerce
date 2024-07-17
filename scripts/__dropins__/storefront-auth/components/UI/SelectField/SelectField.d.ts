import { FunctionComponent } from 'preact';

export interface SelectFieldProps {
    name?: string;
    errors?: Record<string, string>;
    values?: Record<string, string>;
    selectTitle?: string;
    optionConfig?: {
        value: string;
        label: string;
        is_default: boolean;
    }[];
    onChange?: (event: any) => void;
    onBlur?: (event: any) => void;
}
export declare const SelectField: FunctionComponent<SelectFieldProps>;
//# sourceMappingURL=SelectField.d.ts.map