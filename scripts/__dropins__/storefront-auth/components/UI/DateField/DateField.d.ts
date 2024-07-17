import { FunctionComponent } from 'preact';

export interface DateFieldProps {
    children?: any;
    label?: string;
    name?: string;
    errors?: Record<string, string>;
    values?: Record<string, string>;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
}
export declare const DateField: FunctionComponent<DateFieldProps>;
//# sourceMappingURL=DateField.d.ts.map