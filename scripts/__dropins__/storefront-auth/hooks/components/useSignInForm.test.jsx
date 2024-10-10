import { renderHook, act } from '@adobe/elsie/lib/tests';
import { useSignInForm } from '@/auth/hooks/components/useSignInForm';
import { getCustomerToken } from '@/auth/api';
import { getFormValues } from '@/auth/lib/getFormValues';
import { Provider } from '@/auth/render/Provider';
const wrapper = ({ children }) => <Provider>{children}</Provider>;
jest.mock('@/auth/api', () => ({
    getCustomerToken: jest.fn(),
    resendConfirmationEmail: jest.fn(),
}));
jest.mock('@/auth/lib/getFormValues');
describe('[AUTH-hooks] - useSignInForm', () => {
    const mockEmailStatus = {
        text: '',
        status: 'success',
    };
    const routeSignUp = () => 'https://example.com/signup';
    const mockHandleSetInLineAlertProps = jest.fn();
    const mockOnSuccessCallback = jest.fn();
    const mockOnSignUpLinkClick = jest.fn();
    const mockSetActiveComponent = jest.fn();
    const mockOnErrorCallback = jest.fn();
    const mockRouteRedirectOnSignIn = jest.fn();
    const props = {
        emailConfirmationStatusMessage: mockEmailStatus,
        initialEmailValue: '',
        routeRedirectOnSignIn: mockRouteRedirectOnSignIn,
        routeRedirectOnEmailConfirmationClose: false,
        routeSignUp: () => 'https://example.com/signup',
        routeForgotPassword: () => 'https://example.com/forgotpassword',
        onErrorCallback: mockOnErrorCallback,
        setActiveComponent: mockSetActiveComponent,
        onSuccessCallback: mockOnSuccessCallback,
        onSignUpLinkClick: mockOnSignUpLinkClick,
        handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        translations: {
            resendEmailInformationText: 'This account is not confirmed.',
            resendEmailButtonText: 'Click here',
            resendEmailAdditionalText: 'to resend confirmation email.',
        },
    };
    beforeEach(() => {
        mockOnSignUpLinkClick.mockClear();
        mockSetActiveComponent.mockClear();
        Object.defineProperty(window, 'location', {
            value: {
                href: jest.fn(),
            },
            writable: true,
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    const mockSuccessSignIn = () => {
        getFormValues.mockReturnValue({
            password: 'NewValidPassword123!',
            email: 'test@example.com',
        });
        getCustomerToken.mockResolvedValue({ userName: 'John' });
    };
    const testSignIn = async (result) => {
        const mockForm = document.createElement('form');
        const mockInputEmail = document.createElement('input');
        mockInputEmail.setAttribute('type', 'email');
        mockInputEmail.setAttribute('name', 'email');
        mockInputEmail.value = 'test@example.com';
        mockForm.appendChild(mockInputEmail);
        await act(async () => {
            await result.current.submitLogInUser({
                preventDefault: jest.fn(),
                target: mockForm,
            });
        });
    };
    test('should set passwordError to true if password is missing', async () => {
        const { result } = renderHook(() => useSignInForm(Object.assign(props, {
            routeRedirectOnEmailConfirmationClose: () => '',
            routeRedirectOnSignIn: () => '',
        })));
        getFormValues.mockReturnValue({
            password: '',
            email: 'test@example.com',
        });
        await testSignIn(result);
        expect(result.current.passwordError).toBe(true);
    });
    test('calls onSignUpLinkClick if it is a function', () => {
        const { result } = renderHook(() => useSignInForm({
            onSignUpLinkClick: mockOnSignUpLinkClick,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            translations: {},
        }));
        act(() => {
            result.current.onSignUpLinkClickCallback();
        });
        expect(mockOnSignUpLinkClick).toHaveBeenCalled();
        expect(window.location.href).not.toHaveBeenCalled();
    });
    test('sets active component to signUpForm if setActiveComponent is a function', () => {
        const { result } = renderHook(() => useSignInForm({
            onSignUpLinkClick: undefined,
            routeSignUp,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            translations: {},
        }));
        act(() => {
            result.current.onSignUpLinkClickCallback();
        });
        expect(mockOnSignUpLinkClick).not.toHaveBeenCalled();
        expect(mockSetActiveComponent).toHaveBeenCalledWith('signUpForm');
        expect(window.location.href).not.toHaveBeenCalled();
    });
    test('redirects to routeSignUp if no other function is provided', () => {
        const { result } = renderHook(() => useSignInForm({
            onSignUpLinkClick: undefined,
            routeSignUp,
            setActiveComponent: undefined,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            translations: {},
        }));
        act(() => {
            result.current.onSignUpLinkClickCallback();
        });
        expect(mockOnSignUpLinkClick).not.toHaveBeenCalled();
        expect(mockSetActiveComponent).not.toHaveBeenCalled();
        expect(window.location.href).toBe(routeSignUp());
    });
    test('calls setActiveComponent with "resetPasswordForm" when function is provided', () => {
        const mockSetActiveComponent = jest.fn();
        const routeForgotPassword = () => 'https://example.com/forgotpassword';
        const { result } = renderHook(() => useSignInForm({
            setActiveComponent: mockSetActiveComponent,
            routeForgotPassword,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            translations: {},
        }));
        act(() => {
            result.current.forgotPasswordCallback();
        });
        expect(mockSetActiveComponent).toHaveBeenCalledWith('resetPasswordForm');
        expect(window.location.href).not.toHaveBeenCalled();
    });
    test('redirects to routeForgotPassword when setActiveComponent is not provided', () => {
        const routeForgotPassword = () => 'https://example.com/forgotpassword';
        const { result } = renderHook(() => useSignInForm({
            routeForgotPassword,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            translations: {},
        }));
        act(() => {
            result.current.forgotPasswordCallback();
        });
        expect(window.location.href).toBe(routeForgotPassword());
    });
    test("successful login to the user's personal account", async () => {
        const { result } = renderHook(() => useSignInForm(Object.assign(props, {
            routeRedirectOnSignIn: undefined,
            translations: {},
        })));
        mockSuccessSignIn();
        await testSignIn(result);
        expect(mockOnSuccessCallback).toHaveBeenCalledWith({
            status: true,
            userName: 'John',
        });
    });
    test('called routeRedirectOnSignIn', async () => {
        const routeRedirectOnSignIn = jest
            .fn()
            .mockReturnValue('https://example.com');
        const { result } = renderHook(() => useSignInForm(
        // @ts-ignore
        Object.assign(props, {
            routeRedirectOnSignIn,
            translations: {},
        })));
        mockSuccessSignIn();
        await testSignIn(result);
        expect(window.location.href).toBe('https://example.com');
    });
    test('called redirect if use forgotPasswordCallback() with routeForgotPassword', () => {
        const mockRouteForgotPassword = jest
            .fn()
            .mockReturnValue('https://example.com');
        const { result } = renderHook(() => useSignInForm({
            onSignUpLinkClick: undefined,
            setActiveComponent: undefined,
            routeForgotPassword: mockRouteForgotPassword,
            handleSetInLineAlertProps: jest.fn(),
            translations: props.translations,
        }));
        act(() => {
            result.current.forgotPasswordCallback();
        });
        expect(window.location.href).toBe('https://example.com');
    });
    test('get defaultEnhancedEmailFields', () => {
        const { result } = renderHook(() => useSignInForm({
            handleSetInLineAlertProps: jest.fn(),
            initialEmailValue: 'test@mail.com',
            translations: {},
        }));
        expect(result.current.defaultEnhancedEmailFields).toStrictEqual([
            {
                customUpperCode: 'email',
                code: 'email',
                defaultValue: 'test@mail.com',
                entityType: 'CUSTOMER',
                className: 'auth-sign-in-form__form__email',
                fieldType: 'TEXT',
                id: 'email',
                isUnique: false,
                required: true,
                label: 'Email',
                options: [],
                orderNumber: 1,
                multilineCount: 1,
                name: 'email',
            },
        ]);
    });
    test('called handledOnPrimaryButtonClick if routeRedirectOnEmailConfirmationClose true', () => {
        const mockRouteRedirectOnEmailConfirmationClose = jest
            .fn()
            .mockReturnValue('https://example.com');
        const mockHandleSetUpdateNotification = jest.fn();
        const { result } = renderHook(() => useSignInForm({
            onSignUpLinkClick: undefined,
            setActiveComponent: undefined,
            routeRedirectOnEmailConfirmationClose: mockRouteRedirectOnEmailConfirmationClose,
            handleSetInLineAlertProps: mockHandleSetUpdateNotification,
            translations: {},
        }));
        act(() => {
            result.current.handledOnPrimaryButtonClick();
        });
        expect(window.location.href).toBe('https://example.com');
        expect(mockHandleSetUpdateNotification).toHaveBeenCalled();
    });
    test('called handledOnPrimaryButtonClick if routeRedirectOnEmailConfirmationClose false', () => {
        const mockHandleSetUpdateNotification = jest.fn();
        const { result } = renderHook(() => useSignInForm({
            onSignUpLinkClick: undefined,
            setActiveComponent: undefined,
            routeRedirectOnEmailConfirmationClose: undefined,
            handleSetInLineAlertProps: mockHandleSetUpdateNotification,
            translations: {},
        }));
        act(() => {
            result.current.handledOnPrimaryButtonClick();
        });
        expect(result.current.showEmailConfirmationForm).toBe(false);
    });
    test('render handleSetUpdateNotification if emailConfirmationStatusMessage true', () => {
        renderHook(() => useSignInForm({
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            emailConfirmationStatusMessage: {
                text: 'Test message',
                status: 'success',
            },
            translations: props.translations,
        }));
        expect(mockHandleSetInLineAlertProps).toHaveBeenCalledWith({
            text: 'Test message',
            type: 'success',
        });
    });
    test('called error emailResendInformationText', async () => {
        const { result } = renderHook(() => useSignInForm({
            ...props,
            routeRedirectOnEmailConfirmationClose: undefined,
        }), {
            wrapper,
        });
        getFormValues.mockReturnValue({
            password: 'NewValidPassword123!',
            email: 'test@example.com',
        });
        getCustomerToken.mockResolvedValue({
            errorMessage: ["This account isn't confirmed. Verify and try again."],
        });
        await testSignIn(result);
        expect(mockHandleSetInLineAlertProps).toHaveBeenCalled();
    });
    test('handleSetPassword sets password and clears passwordError if password is provided', () => {
        const { result } = renderHook(() => useSignInForm({
            ...props,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            routeRedirectOnEmailConfirmationClose: undefined,
        }));
        act(() => {
            result.current.handleSetPassword('NewPassword123!');
        });
        expect(result.current.passwordError).toBe(false);
        expect(result.current.signInPasswordValue).toBe('NewPassword123!');
    });
    test('handleSetPassword sets passwordError to true if password is empty', () => {
        const { result } = renderHook(() => useSignInForm({
            ...props,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            routeRedirectOnEmailConfirmationClose: undefined,
        }));
        act(() => {
            result.current.handleSetPassword('');
        });
        expect(result.current.passwordError).toBe(true);
        expect(result.current.signInPasswordValue).toBe('');
    });
});
