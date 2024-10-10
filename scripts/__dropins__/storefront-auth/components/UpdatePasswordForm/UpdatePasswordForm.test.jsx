/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { UpdatePasswordForm } from '@/auth/components/UpdatePasswordForm';
import { useGetStoreConfigs } from '@/auth/hooks/api/useGetStoreConfigs';
import { useUpdatePasswordForm } from '@/auth/hooks/components/useUpdatePasswordForm';
import { usePasswordValidationMessage } from '@/auth/hooks/components/usePasswordValidationMessage';
import { revokeCustomerToken } from '@/auth/api';
jest.mock('@/auth/hooks/api/useGetStoreConfigs');
jest.mock('@/auth/hooks/components/useUpdatePasswordForm');
jest.mock('@/auth/hooks/components/usePasswordValidationMessage');
jest.mock('@/auth/api');
beforeAll(() => {
    Object.defineProperty(window, 'location', {
        value: {
            href: '/logout',
            assign: jest.fn(),
            reload: jest.fn(),
            replace: jest.fn(),
            toString: jest.fn(),
        },
        writable: true,
    });
});
afterAll(() => {
    jest.restoreAllMocks();
});
describe('[AUTH-components] - UpdatePasswordForm', () => {
    const passwordConfigs = { minLength: 5, requiredCharacterClasses: 1 };
    const onErrorCallback = jest.fn();
    const onSuccessCallback = jest.fn();
    beforeEach(() => {
        useGetStoreConfigs.mockReturnValue({
            passwordConfigs: { minLength: 8, requiredCharacterClasses: 3 },
        });
        useUpdatePasswordForm.mockReturnValue({
            isSuccessful: { status: false, userName: '' },
            updatePasswordValue: '',
            isClickSubmit: false,
            isLoading: false,
            updateNotification: { status: '', text: '' },
            submitUpdatePassword: jest.fn(),
            handleSetUpdatePasswordValue: jest.fn(),
        });
        usePasswordValidationMessage.mockReturnValue({
            isValidUniqueSymbols: '',
            defaultLengthMessage: { status: '', icon: '', message: '' },
        });
        revokeCustomerToken.mockResolvedValue('');
    });
    test('renders', () => {
        const { container } = render(<UpdatePasswordForm />);
        expect(!!container).toEqual(true);
    });
    test('renders title and form when not successful', () => {
        const { container } = render(<UpdatePasswordForm formSize="default"/>);
        const title = container.querySelector('.auth-update-password-form__title');
        expect(title).toHaveTextContent('Update password');
    });
    test('displays success notification and redirects on button click', async () => {
        const routeRedirectOnSignIn = () => '/';
        const routeWrongUrlRedirect = () => '/';
        useUpdatePasswordForm.mockReturnValueOnce({
            ...useUpdatePasswordForm({
                passwordConfigs,
                routeRedirectOnSignIn,
                routeWrongUrlRedirect,
                onErrorCallback,
                onSuccessCallback,
                handleSetInLineAlertProps: jest.fn(),
            }),
            isSuccessful: { status: true, userName: 'John Doe' },
        });
        render(<UpdatePasswordForm routeWrongUrlRedirect={() => '/logout'} slots={{
                SuccessNotification: () => { },
            }}/>);
        expect(screen.getByTestId('successNotificationTestId')).toBeInTheDocument();
    });
    test('displays error input password', async () => {
        useGetStoreConfigs.mockReturnValue({
            passwordConfigs: { minLength: 8, requiredCharacterClasses: 3 },
        });
        useUpdatePasswordForm.mockReturnValue({
            isSuccessful: { status: false, userName: '' },
            updatePasswordValue: '',
            isClickSubmit: false,
            isLoading: false,
            updateNotification: { status: '', text: '' },
            submitUpdatePassword: jest.fn(),
            handleSetUpdatePasswordValue: jest.fn(),
            passwordError: true,
        });
        usePasswordValidationMessage.mockReturnValue({
            isValidUniqueSymbols: '',
            defaultLengthMessage: { status: 'error', icon: '', message: 'error' },
        });
        render(<UpdatePasswordForm routeWrongUrlRedirect={() => '/logout'} slots={{
                SuccessNotification: () => { },
            }}/>);
        const element = screen.getByText('This is a required field.');
        expect(element).toBeInTheDocument();
    });
});
