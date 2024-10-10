import { renderHook, act, waitFor } from '@adobe/elsie/lib/tests';
import { useSignUpForm } from '@/auth/hooks/components/useSignUpForm';
import { getCustomerToken, createCustomer } from '@/auth/api';
import { validationUniqueSymbolsPassword } from '@/auth/lib/validationUniqueSymbolsPassword';
const createElement = (config) => {
    const mockInputEmail = document.createElement('input');
    mockInputEmail.setAttribute('type', config.type);
    mockInputEmail.setAttribute('name', config.name);
    mockInputEmail.value = config.value;
    return mockInputEmail;
};
jest.mock('@/auth/api', () => ({
    getCustomerToken: jest.fn(),
    createCustomer: jest.fn(),
}));
jest.mock('@/auth/api/createCustomer');
jest.mock('@/auth/lib/validationUniqueSymbolsPassword');
describe('[AUTH-hooks] - useSignUpForm', () => {
    let mockSetActiveComponent;
    const routeSignIn = () => 'https://example.com/signin';
    beforeEach(() => {
        mockSetActiveComponent = jest.fn();
        Object.defineProperty(window, 'location', {
            value: {
                href: jest.fn(),
            },
            writable: true,
        });
        global.FormData = jest.fn().mockImplementation(() => ({
            append: jest.fn(),
        }));
    });
    afterEach(() => {
        jest.restoreAllMocks();
        global.FormData.mockRestore();
    });
    const mockSignUp = (customer = 'testUser', userName = 'testUser') => {
        validationUniqueSymbolsPassword.mockResolvedValue(true);
        createCustomer.mockResolvedValue({
            data: {
                createCustomer: {
                    customer,
                },
            },
            errors: [],
        });
        getCustomerToken.mockResolvedValue({
            userName,
        });
    };
    const testSignUp = async (result) => {
        const mockForm = document.createElement('form');
        [
            createElement({
                type: 'email',
                name: 'email',
                value: 'test@example.com',
            }),
            createElement({
                type: 'password',
                name: 'password',
                value: 'password',
            }),
            createElement({
                type: 'text',
                name: 'is_subscribed',
                value: 'false',
            }),
        ].forEach((element) => {
            mockForm.appendChild(element);
        });
        await act(async () => {
            await result.current.onSubmitSignUp({
                preventDefault: jest.fn(),
                target: mockForm,
            }, true);
            result.current.handleHideEmailConfirmationForm();
        });
    };
    test('signInButton calls setActiveComponent with "signInForm" when function is provided', () => {
        const { result } = renderHook(() => useSignUpForm({
            setActiveComponent: mockSetActiveComponent,
            routeSignIn: undefined,
            isEmailConfirmationRequired: true,
            handleSetInLineAlertProps: jest.fn(),
            translations: {},
        }));
        act(() => {
            result.current.signInButton();
        });
        expect(mockSetActiveComponent).toHaveBeenCalledWith('signInForm');
        expect(window.location.href).not.toHaveBeenCalled();
    });
    test('signInButton calls routeSignIn href', () => {
        const { result } = renderHook(() => useSignUpForm({
            routeSignIn: () => 'https://example.com',
            handleSetInLineAlertProps: jest.fn(),
            isEmailConfirmationRequired: false,
            translations: {},
        }));
        act(() => {
            result.current.signInButton();
        });
        expect(window.location.href).toBe('https://example.com');
    });
    test('signInButton redirects to routeSignIn when setActiveComponent is not provided', () => {
        const { result } = renderHook(() => useSignUpForm({
            routeSignIn,
            isEmailConfirmationRequired: true,
            handleSetInLineAlertProps: jest.fn(),
            translations: {},
        }));
        act(() => {
            result.current.signInButton();
        });
        expect(window.location.href).toBe(routeSignIn());
        expect(mockSetActiveComponent).not.toHaveBeenCalled();
    });
    test('handleSetSignUpPasswordValue updates signUpPasswordValue state', () => {
        const testPassword = 'testPassword123';
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: true,
            handleSetInLineAlertProps: jest.fn(),
            translations: {},
        }));
        act(() => {
            result.current.handleSetSignUpPasswordValue(testPassword);
        });
        expect(result.current.signUpPasswordValue).toBe(testPassword);
    });
    test('successfully creates a user', async () => {
        const onSuccessCallback = jest.fn();
        const onErrorCallback = jest.fn();
        const handleSetInLineAlertProps = jest.fn();
        validationUniqueSymbolsPassword.mockResolvedValue(true);
        createCustomer.mockResolvedValue({
            data: {
                createCustomer: {
                    customer: 'testUser',
                },
            },
            errors: [],
        });
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: false,
            apiVersion2: false,
            onSuccessCallback,
            onErrorCallback,
            handleSetInLineAlertProps,
            translations: {},
        }));
        document.body.innerHTML = `
    <form id="testForm">
      <input name="email" value="test@example.com" />
      <input name="password" value="secret" />
      <input name="is_subscribed" value="false" />
    </form>
  `;
        getCustomerToken.mockResolvedValue({
            userName: 'testUser',
        });
        const form = document.querySelector('#testForm');
        const formData = new FormData(form);
        const fakeEvent = { preventDefault: jest.fn(), target: formData };
        await act(() => {
            result.current.onSubmitSignUp(fakeEvent, false);
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));
    });
    test('should set isClickSubmit and isLoading correctly when validation fails', async () => {
        validationUniqueSymbolsPassword.mockReturnValue(false);
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: true,
            handleSetInLineAlertProps: jest.fn(),
            translations: {},
        }));
        document.body.innerHTML = `
    <form id="testForm">
      <input name="email" value="test@example.com" />
      <input name="password" value="secret" />
      <input name="is_subscribed" value="false" />
    </form>
  `;
        const form = document.querySelector('#testForm');
        const formData = new FormData(form);
        const fakeEvent = { preventDefault: jest.fn(), target: formData };
        await act(() => {
            result.current.onSubmitSignUp(fakeEvent, true);
        });
        expect(result.current.isClickSubmit).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });
    test('should toggle isKeepMeLogged and setAccountManualConfirmation based on checked value', () => {
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: true,
            handleSetInLineAlertProps: jest.fn(),
            translations: {},
        }));
        expect(result.current.isKeepMeLogged).toBe(true);
        act(() => {
            result.current.onKeepMeLoggedChange({ target: { checked: false } });
        });
        expect(result.current.isKeepMeLogged).toBe(false);
        act(() => {
            result.current.onKeepMeLoggedChange({ target: { checked: true } });
        });
        expect(result.current.isKeepMeLogged).toBe(true);
    });
    test('called routeRedirectOnEmailConfirmationClose', async () => {
        const onSuccessCallback = jest.fn();
        const onErrorCallback = jest.fn();
        const handleSetInLineAlertProps = jest.fn();
        const mockRouteRedirectOnEmailConfirmationClose = jest
            .fn()
            .mockReturnValue('https://example.com');
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: true,
            apiVersion2: false,
            onSuccessCallback,
            onErrorCallback,
            handleSetInLineAlertProps,
            routeRedirectOnEmailConfirmationClose: mockRouteRedirectOnEmailConfirmationClose,
            translations: {},
        }));
        mockSignUp();
        await testSignUp(result);
        expect(handleSetInLineAlertProps).toHaveBeenCalled();
        expect(window.location.href).toBe('https://example.com');
    });
    test('called hide email Confirmation Form', async () => {
        const onSuccessCallback = jest.fn();
        const onErrorCallback = jest.fn();
        const handleSetInLineAlertProps = jest.fn();
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: true,
            apiVersion2: false,
            onSuccessCallback,
            onErrorCallback,
            handleSetInLineAlertProps,
            translations: {},
        }));
        mockSignUp();
        await testSignUp(result);
        expect(handleSetInLineAlertProps).toHaveBeenCalled();
        expect(result.current.showEmailConfirmationForm).toBe(false);
    });
    test('called errors createCustomer is failed', async () => {
        const onSuccessCallback = jest.fn();
        const onErrorCallback = jest.fn();
        const handleSetInLineAlertProps = jest.fn();
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: true,
            apiVersion2: false,
            onSuccessCallback,
            onErrorCallback,
            handleSetInLineAlertProps,
            translations: {},
        }));
        validationUniqueSymbolsPassword.mockResolvedValue(true);
        createCustomer.mockResolvedValue({
            data: {
                createCustomer: {
                    customer: null,
                },
            },
            errors: [{ message: 'Error' }],
        });
        const mockEvent = {
            preventDefault: jest.fn(),
            target: {
                email: { value: 'test@example.com' },
                password: { value: 'password' },
                is_subscribed: { value: 'false' },
                reset: jest.fn(),
            },
        };
        await act(async () => {
            await result.current.onSubmitSignUp(mockEvent, true);
        });
        expect(handleSetInLineAlertProps).toHaveBeenCalledWith({
            type: 'error',
            text: 'Error',
        });
    });
    test('called with routeRedirectOnSignIn', async () => {
        const onSuccessCallback = jest.fn();
        const onErrorCallback = jest.fn();
        const handleSetInLineAlertProps = jest.fn();
        const mockRouteRedirectOnSignIn = jest
            .fn()
            .mockReturnValue('https://example.com');
        const { result } = renderHook(() => useSignUpForm({
            isAutoSignInEnabled: true,
            isEmailConfirmationRequired: false,
            apiVersion2: false,
            onSuccessCallback,
            onErrorCallback,
            handleSetInLineAlertProps,
            routeRedirectOnSignIn: mockRouteRedirectOnSignIn,
            translations: {},
        }));
        mockSignUp();
        await testSignUp(result);
        expect(window.location.href).toBe('https://example.com');
    });
    test('called checkIsFunction(routeRedirectOnSignIn) is false', async () => {
        const onSuccessCallback = jest.fn();
        const onErrorCallback = jest.fn();
        const handleSetInLineAlertProps = jest.fn();
        const mockRouteRedirectOnSignIn = undefined;
        const { result } = renderHook(() => useSignUpForm({
            isAutoSignInEnabled: true,
            isEmailConfirmationRequired: false,
            apiVersion2: false,
            onSuccessCallback,
            onErrorCallback,
            handleSetInLineAlertProps,
            routeRedirectOnSignIn: mockRouteRedirectOnSignIn,
            translations: {},
        }));
        validationUniqueSymbolsPassword.mockResolvedValue(true);
        createCustomer.mockResolvedValue({
            data: {
                createCustomer: {
                    customer: 'testUser',
                },
            },
            errors: [],
        });
        getCustomerToken.mockResolvedValue({
            userName: 'testUser',
        });
        const mockForm = document.createElement('form');
        [
            createElement({
                type: 'email',
                name: 'email',
                value: 'test@example.com',
            }),
            createElement({
                type: 'password',
                name: 'password',
                value: 'password',
            }),
            createElement({
                type: 'text',
                name: 'is_subscribed',
                value: 'false',
            }),
        ].forEach((element) => {
            mockForm.appendChild(element);
        });
        await act(async () => {
            await result.current.onSubmitSignUp({
                preventDefault: jest.fn(),
                target: mockForm,
            }, true);
        });
        expect(onSuccessCallback).toHaveBeenCalledWith({
            userName: 'testUser',
            status: true,
        });
    });
    test('called getCustomerToken with null', async () => {
        const onSuccessCallback = jest.fn();
        const onErrorCallback = jest.fn();
        const handleSetInLineAlertProps = jest.fn();
        const mockRouteRedirectOnSignIn = jest
            .fn()
            .mockReturnValue('https://example.com');
        const { result } = renderHook(() => useSignUpForm({
            isEmailConfirmationRequired: false,
            apiVersion2: false,
            onSuccessCallback,
            onErrorCallback,
            handleSetInLineAlertProps,
            routeRedirectOnSignIn: mockRouteRedirectOnSignIn,
            translations: {},
        }));
        mockSignUp('testUser', null);
        await testSignUp(result);
        expect(window.location.href).not.toBe('https://example.com');
    });
});
