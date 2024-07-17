import { FunctionComponent } from 'preact';

export interface TextFieldProps {
    label?: string;
    className?: string;
    name?: string;
    errors?: Record<string, string>;
    values?: Record<string, string>;
    onChange?: (event: any) => void;
    onBlur?: (event: any) => void;
}
export declare const TextField: FunctionComponent<TextFieldProps>;
//# sourceMappingURL=TextField.d.ts.map