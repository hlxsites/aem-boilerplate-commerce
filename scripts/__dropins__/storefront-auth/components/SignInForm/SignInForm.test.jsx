/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen, fireEvent } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { SignInForm } from '@/auth/components/SignInForm';
import { useSignInForm } from '@/auth/hooks/components/useSignInForm';
jest.mock('@/auth/hooks/components/useSignInForm');
jest.mock('@/auth/api', () => ({
    revokeCustomerToken: jest.fn(),
}));
describe('[AUTH-components] - SignInForm', () => {
    const routeForgotPassword = () => 'www.google.com';
    const routeRedirectOnSignIn = () => '/';
    const onErrorCallback = jest.fn();
    const onSuccessCallback = jest.fn();
    const handleSetInLineAlertProps = jest.fn();
    const translations = {
        customerTokenErrorMessage: 'Unable to log in.',
    };
    beforeEach(() => {
        jest.resetAllMocks();
        useSignInForm.mockReturnValue({
            resetPasswordInForm: false,
            passwordError: false,
            isSuccessful: { status: false, userName: '' },
            updateNotification: { status: '', text: '' },
            isLoading: false,
            submitLogInUser: jest.fn(),
            forgotPasswordCallback: jest.fn(),
            setResetPasswordInForm: jest.fn(),
        });
    });
    test('renders', () => {
        const { container } = render(<SignInForm />);
        expect(!!container).toEqual(true);
    });
    test('renders sign in form correctly', () => {
        render(<SignInForm renderSignUpLink={true}/>);
        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Forgot password?' })).toBeInTheDocument();
    });
    test('displays success notification upon successful login', () => {
        useSignInForm.mockReturnValueOnce({
            ...useSignInForm({
                routeForgotPassword,
                routeRedirectOnSignIn,
                onErrorCallback,
                onSuccessCallback,
                handleSetInLineAlertProps,
                translations,
            }),
            isSuccessful: { status: true, userName: 'John Doe' },
        });
        render(<SignInForm slots={{
                SuccessNotification: () => { },
            }}/>);
        expect(screen.getByTestId('successNotificationTestId')).toBeInTheDocument();
    });
    test('calls forgotPasswordCallback on clicking "Forgot password?" button', () => {
        const { forgotPasswordCallback } = useSignInForm({
            routeForgotPassword,
            routeRedirectOnSignIn,
            onErrorCallback,
            onSuccessCallback,
            handleSetInLineAlertProps,
            translations: {},
        });
        render(<SignInForm />);
        fireEvent.click(screen.getByText('Forgot password?'));
        expect(forgotPasswordCallback).toHaveBeenCalledTimes(1);
    });
    test('render showEmailConfirmationForm', () => {
        useSignInForm.mockReturnValueOnce({
            ...useSignInForm({
                routeForgotPassword,
                routeRedirectOnSignIn,
                handleSetInLineAlertProps,
                onErrorCallback,
                onSuccessCallback,
                emailConfirmationStatusMessage: {
                    status: 'success',
                    text: 'success',
                },
                translations,
            }),
            userEmail: 'test@mail.com',
            showEmailConfirmationForm: true,
            setShowEmailConfirmationForm: jest.fn(),
        });
        render(<SignInForm />);
        expect(screen.getByText('Verify your email address')).toBeInTheDocument();
    });
    test('displays error input password', () => {
        useSignInForm.mockReturnValue({
            resetPasswordInForm: false,
            passwordError: true,
            isSuccessful: { status: false, userName: '' },
            updateNotification: { status: '', text: '' },
            isLoading: false,
            submitLogInUser: jest.fn(),
            forgotPasswordCallback: jest.fn(),
            setResetPasswordInForm: jest.fn(),
        });
        const { container } = render(<SignInForm />);
        const element = screen.getByText('This is a required field.');
        expect(!!container).toEqual(true);
        expect(element).toBeInTheDocument();
    });
});
