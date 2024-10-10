import { useUpdatePasswordForm } from '@/auth/hooks/components/useUpdatePasswordForm';
import { act } from 'preact/test-utils';
import { renderHook } from '@adobe/elsie/lib/tests';
import { validationUniqueSymbolsPassword } from '@/auth/lib/validationUniqueSymbolsPassword';
import { getFormValues } from '@/auth/lib/getFormValues';
import { getCustomerToken, resetPassword } from '@/auth/api';
import { Provider } from '@/auth/render/Provider';
import { checkIsFunction } from '@/auth/lib/checkIsFunction';
const deleteWindowLocation = () => {
    try {
        // @ts-ignore
        delete window.location;
    }
    catch (e) { }
};
const mockWindowLocation = (url) => {
    deleteWindowLocation();
    window.location = new URL(url);
};
jest.mock('@/auth/lib/checkIsFunction', () => ({
    checkIsFunction: jest.fn(),
}));
jest.mock('@/auth/lib/getFormValues');
jest.mock('@/auth/lib/validationUniqueSymbolsPassword');
jest.mock('@/auth/api/resetPassword');
jest.mock('@/auth/api', () => ({
    getCustomerToken: jest.fn(),
    resetPassword: jest.fn(),
}));
const wrapper = ({ children }) => <Provider>{children}</Provider>;
const mockHandleSetInLineAlertProps = jest.fn();
const mockOnSuccessCallback = jest.fn();
const mockOnErrorCallback = jest.fn();
describe('[AUTH-hooks] - useUpdatePasswordForm', () => {
    beforeEach(() => {
        mockWindowLocation('https://example.com');
        jest.clearAllMocks();
    });
    test('should redirect to the provided URL if the search params are wrong', () => {
        checkIsFunction.mockReturnValueOnce(true);
        const routeWrongUrlRedirect = () => 'https://redirect.com/';
        mockWindowLocation('https://example.com?invalid=param');
        renderHook(() => useUpdatePasswordForm({
            routeWrongUrlRedirect,
            handleSetInLineAlertProps: jest.fn(),
        }));
        expect(window.location.href).toBe(routeWrongUrlRedirect());
    });
    test('should not redirect if email and token are present in the URL search params', () => {
        const originalLocation = window.location;
        deleteWindowLocation();
        const mockHref = jest.fn();
        window.location = {
            ...originalLocation,
            href: '',
            search: '?email=test@example.com&token=123456',
            assign: mockHref,
        };
        const routeWrongUrlRedirect = () => 'https://redirect.com';
        renderHook(() => useUpdatePasswordForm({
            routeWrongUrlRedirect,
            handleSetInLineAlertProps: jest.fn(),
        }));
        expect(mockHref).not.toHaveBeenCalled();
        window.location = originalLocation;
    });
    test('should handle updatePasswordValue change', () => {
        const { result } = renderHook(() => useUpdatePasswordForm({
            routeWrongUrlRedirect: () => 'https://adobe.com',
            handleSetInLineAlertProps: jest.fn(),
        }));
        act(() => {
            result.current.handleSetUpdatePasswordValue('newPassword');
        });
        expect(result.current.updatePasswordValue).toBe('newPassword');
    });
    test('should not submit if password does not meet uniqueness or length requirements', async () => {
        const { result } = renderHook(() => useUpdatePasswordForm({
            passwordConfigs: { requiredCharacterClasses: 2, minLength: 8 },
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            onSuccessCallback: mockOnSuccessCallback,
            onErrorCallback: mockOnErrorCallback,
        }));
        validationUniqueSymbolsPassword.mockReturnValue(false);
        const fakeEvent = { preventDefault: jest.fn() };
        await act(async () => {
            result.current.submitUpdatePassword(fakeEvent);
        });
        expect(result.current.isClickSubmit).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });
    test('should not proceed if validation data is missing', async () => {
        getFormValues.mockReturnValue({
            password: 'test_length_password',
        });
        validationUniqueSymbolsPassword.mockReturnValue(true);
        const { result } = renderHook(() => useUpdatePasswordForm({
            passwordConfigs: { requiredCharacterClasses: 1, minLength: 8 },
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            onSuccessCallback: mockOnSuccessCallback,
            onErrorCallback: mockOnErrorCallback,
        }), { wrapper });
        const fakeEvent = { preventDefault: jest.fn() };
        await act(async () => {
            await result.current.submitUpdatePassword(fakeEvent);
        });
        expect(mockHandleSetInLineAlertProps).toHaveBeenCalledWith({
            type: 'error',
            text: 'Your password update failed due to validation errors. Please check your information and try again.',
        });
        expect(result.current.isLoading).toBe(false);
    });
    test('should call onSuccessCallback on successful password reset', async () => {
        const originalLocation = window.location;
        deleteWindowLocation();
        const mockHref = jest.fn();
        window.location = {
            ...originalLocation,
            href: '',
            search: '?email=test@example.com&token=123456',
            assign: mockHref,
        };
        getFormValues.mockReturnValue({
            password: 'NewValidPassword123!',
            email: 'test@example.com',
        });
        validationUniqueSymbolsPassword.mockReturnValue(true);
        resetPassword.mockResolvedValue({
            message: 'Password reset successful',
            success: true,
        });
        getCustomerToken.mockResolvedValue({
            userName: 'User123',
        });
        const { result } = renderHook(() => useUpdatePasswordForm({
            // @ts-ignore
            passwordConfigs: { requiredCharacterClasses: null, minLength: null },
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            onSuccessCallback: mockOnSuccessCallback,
            onErrorCallback: mockOnErrorCallback,
            isEmailConfirmationRequired: false,
            signInOnSuccess: true,
        }));
        const fakeEvent = { preventDefault: jest.fn() };
        await act(async () => {
            await result.current.submitUpdatePassword(fakeEvent);
        });
        expect(mockOnSuccessCallback).toHaveBeenCalledWith('User123');
        expect(result.current.isLoading).toBe(false);
    });
    test('should call handleSetInLineAlertProps on error password reset', async () => {
        const originalLocation = window.location;
        deleteWindowLocation();
        const mockHref = jest.fn();
        window.location = {
            ...originalLocation,
            href: '',
            search: '?email=test@example.com&token=123456',
            assign: mockHref,
        };
        getFormValues.mockReturnValue({
            password: 'NewValidPassword123!',
            email: 'test@example.com',
        });
        validationUniqueSymbolsPassword.mockReturnValue(true);
        resetPassword.mockResolvedValue({
            message: 'Password reset error',
            success: false,
        });
        const { result } = renderHook(() => useUpdatePasswordForm({
            passwordConfigs: { requiredCharacterClasses: 3, minLength: 8 },
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            onSuccessCallback: mockOnSuccessCallback,
            onErrorCallback: mockOnErrorCallback,
        }));
        const fakeEvent = { preventDefault: jest.fn() };
        await act(async () => {
            await result.current.submitUpdatePassword(fakeEvent);
        });
        expect(mockHandleSetInLineAlertProps).toHaveBeenCalledWith({
            type: 'error',
            text: 'Password reset error',
        });
        expect(result.current.isLoading).toBe(false);
    });
    test('is routeRedirectOnSignIn === true and redirect to routeRedirectOnSignIn', async () => {
        checkIsFunction.mockReturnValueOnce(true);
        const mockRouteRedirectOnSignIn = jest.fn(() => 'https://google.com');
        const originalLocation = window.location;
        deleteWindowLocation();
        const mockHref = jest.fn();
        window.location = {
            ...originalLocation,
            href: '',
            search: '?email=test@example.com&token=123456',
            assign: mockHref,
        };
        getFormValues.mockReturnValue({
            password: 'NewValidPassword123!',
            email: 'test@example.com',
        });
        validationUniqueSymbolsPassword.mockReturnValue(true);
        resetPassword.mockResolvedValue({
            message: 'Password reset successful',
            success: true,
        });
        getCustomerToken.mockResolvedValue({
            userName: 'User123',
        });
        const { result } = renderHook(() => useUpdatePasswordForm({
            passwordConfigs: { requiredCharacterClasses: 3, minLength: 8 },
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            onSuccessCallback: mockOnSuccessCallback,
            onErrorCallback: mockOnErrorCallback,
            isEmailConfirmationRequired: false,
            signInOnSuccess: true,
            routeRedirectOnSignIn: mockRouteRedirectOnSignIn,
        }));
        const fakeEvent = { preventDefault: jest.fn() };
        await act(async () => {
            await result.current.submitUpdatePassword(fakeEvent);
        });
        expect(mockRouteRedirectOnSignIn).toHaveBeenCalled();
        expect(window.location.href).toBe('https://google.com');
    });
    test('is isEmailConfirmationRequired === true && routeRedirectOnPasswordUpdate === true', async () => {
        checkIsFunction.mockReturnValueOnce(true);
        const mockRouteRedirectOnPasswordUpdate = jest.fn(() => 'https://google.com');
        const originalLocation = window.location;
        deleteWindowLocation();
        const mockHref = jest.fn();
        window.location = {
            ...originalLocation,
            href: '',
            search: '?email=test@example.com&token=123456',
            assign: mockHref,
        };
        getFormValues.mockReturnValue({
            password: 'NewValidPassword123!',
            email: 'test@example.com',
        });
        validationUniqueSymbolsPassword.mockReturnValue(true);
        resetPassword.mockResolvedValue({
            message: 'Password reset successful',
            success: true,
        });
        getCustomerToken.mockResolvedValue({
            userName: 'User123',
        });
        const { result } = renderHook(() => useUpdatePasswordForm({
            passwordConfigs: { requiredCharacterClasses: 3, minLength: 8 },
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            onSuccessCallback: mockOnSuccessCallback,
            onErrorCallback: mockOnErrorCallback,
            isEmailConfirmationRequired: true,
            signInOnSuccess: true,
            routeRedirectOnPasswordUpdate: mockRouteRedirectOnPasswordUpdate,
        }));
        const fakeEvent = { preventDefault: jest.fn() };
        await act(async () => {
            await result.current.submitUpdatePassword(fakeEvent);
        });
        expect(mockRouteRedirectOnPasswordUpdate).toHaveBeenCalled();
        expect(window.location.href).toBe('https://google.com');
    });
    test('is isEmailConfirmationRequired === true && routeRedirectOnPasswordUpdate === false', async () => {
        checkIsFunction.mockReturnValueOnce(false);
        const mockRouteRedirectOnPasswordUpdate = jest.fn(() => 'https://google.com');
        const originalLocation = window.location;
        deleteWindowLocation();
        const mockHref = jest.fn();
        window.location = {
            ...originalLocation,
            href: '',
            search: '?email=test@example.com&token=123456',
            assign: mockHref,
        };
        getFormValues.mockReturnValue({
            password: 'NewValidPassword123!',
            email: 'test@example.com',
        });
        validationUniqueSymbolsPassword.mockReturnValue(true);
        resetPassword.mockResolvedValue({
            message: 'Password reset successful',
            success: true,
        });
        getCustomerToken.mockResolvedValue({
            userName: 'User123',
        });
        const { result } = renderHook(() => useUpdatePasswordForm({
            passwordConfigs: { requiredCharacterClasses: 3, minLength: 8 },
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
            onSuccessCallback: mockOnSuccessCallback,
            onErrorCallback: mockOnErrorCallback,
            isEmailConfirmationRequired: true,
            signInOnSuccess: true,
            routeRedirectOnPasswordUpdate: mockRouteRedirectOnPasswordUpdate,
        }));
        const fakeEvent = { preventDefault: jest.fn() };
        await act(async () => {
            await result.current.submitUpdatePassword(fakeEvent);
        });
        expect(mockRouteRedirectOnPasswordUpdate).not.toHaveBeenCalled();
    });
});
