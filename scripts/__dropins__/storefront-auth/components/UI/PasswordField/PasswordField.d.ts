import { FunctionComponent } from 'preact';

export interface PasswordFieldProps {
    initialPassword?: string;
    id?: string;
    isError?: boolean;
    className?: string;
    name?: string;
    children?: any;
    required?: boolean;
    setPasswordValueCallback?: (value: string) => void;
    onBlur?: (event: Event) => void;
}
export declare const PasswordField: FunctionComponent<PasswordFieldProps>;
//# sourceMappingURL=PasswordField.d.ts.map