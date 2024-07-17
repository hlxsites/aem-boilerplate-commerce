import { FunctionComponent } from 'preact';
import { PasswordStatusIndicatorProps } from './PasswordStatusIndicator';
import { HTMLAttributes } from 'preact/compat';

export interface InputPasswordProps extends PasswordStatusIndicatorProps, Omit<HTMLAttributes<HTMLDivElement>, 'minLength'> {
    defaultValue?: string;
    error?: boolean;
    className?: string;
    name?: string;
    required?: boolean;
    onValue?: (event: Event) => void;
    onBlur?: (event: Event) => void;
}
export declare const InputPassword: FunctionComponent<InputPasswordProps>;
//# sourceMappingURL=InputPassword.d.ts.map