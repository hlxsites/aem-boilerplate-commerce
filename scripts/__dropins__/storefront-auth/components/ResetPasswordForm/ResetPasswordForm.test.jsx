/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen, fireEvent, waitFor } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { useResetPasswordForm } from '@/auth/hooks/components/useResetPasswordForm';
import { ResetPasswordForm } from '@/auth/components/ResetPasswordForm';
jest.mock('@/auth/hooks/components/useResetPasswordForm');
jest.mock('@/auth/hooks/useInLineAlert', () => ({
    useInLineAlert: () => ({
        inLineAlertProps: { status: 'error', text: 'Error message' },
        handleSetInLineAlertProps: jest.fn(),
    }),
}));
describe('[AUTH-components] - ResetPasswordForm', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('renders', () => {
        const { container } = render(<ResetPasswordForm routeSignIn={() => '/'} formSize="default"/>);
        expect(!!container).toEqual(true);
    });
    beforeEach(() => {
        useResetPasswordForm.mockReturnValue({
            updateNotification: { status: '', text: '' },
            isLoading: false,
            submitResetPassword: jest.fn(),
            redirectToSignInPage: jest.fn(),
        });
    });
    test('renders the title "Reset your password"', () => {
        render(<ResetPasswordForm routeSignIn={() => '/'}/>);
        expect(screen.getByText('Reset your password')).toBeInTheDocument();
    });
    test('calls redirectToSignInPage when "Back to sign in" button is clicked', () => {
        const onErrorCallback = jest.fn();
        const { redirectToSignInPage } = useResetPasswordForm({
            routeSignIn: () => '',
            onErrorCallback,
        });
        render(<ResetPasswordForm routeSignIn={() => '/'}/>);
        fireEvent.click(screen.getByText('Back to sign in'));
        expect(redirectToSignInPage).toHaveBeenCalled();
    });
    test('displays notification when updateNotification is set', async () => {
        render(<ResetPasswordForm routeSignIn={() => '/'}/>);
        await waitFor(() => {
            expect(screen.getByText('Error message')).toBeInTheDocument();
        });
    });
});
