import { FunctionComponent } from 'preact';

export interface TextAreaFieldProps {
    name?: string;
    label?: string;
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string>;
    onChange?: (event: any) => void;
    onBlur?: (event: any) => void;
}
export declare const TextArea: FunctionComponent<TextAreaFieldProps>;
//# sourceMappingURL=TextArea.d.ts.map