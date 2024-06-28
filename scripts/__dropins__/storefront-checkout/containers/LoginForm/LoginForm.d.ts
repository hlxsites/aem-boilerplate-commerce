import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent } from 'preact';

export interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    email?: string;
    onSignInClick?: (email: string | null) => void;
    onSignOutClick?: () => void;
}
export declare const LoginForm: FunctionComponent<LoginFormProps>;
//# sourceMappingURL=LoginForm.d.ts.map