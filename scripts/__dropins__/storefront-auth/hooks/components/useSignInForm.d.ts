import { useSignInFormProps } from '../../types';

export declare const useSignInForm: ({ emailConfirmationStatusMessage, translations, initialEmailValue, routeSignUp, routeForgotPassword, routeRedirectOnSignIn, onErrorCallback, setActiveComponent, onSuccessCallback, onSignUpLinkClick, handleSetInLineAlertProps, routeRedirectOnEmailConfirmationClose, }: useSignInFormProps) => {
    userEmail: string;
    defaultEnhancedEmailFields: any;
    passwordError: boolean;
    isSuccessful: {
        userName: string;
        status: boolean;
    };
    isLoading: boolean;
    signInPasswordValue: string;
    showEmailConfirmationForm: boolean;
    setShowEmailConfirmationForm: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<boolean>>;
    setSignInPasswordValue: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<string>>;
    submitLogInUser: (event: any) => Promise<void>;
    forgotPasswordCallback: () => void;
    onSignUpLinkClickCallback: () => void;
    handledOnPrimaryButtonClick: () => void;
};
//# sourceMappingURL=useSignInForm.d.ts.map