import { useResetPasswordForm } from '@/auth/hooks/components/useResetPasswordForm';
import { act } from 'preact/test-utils';
import { renderHook } from '@testing-library/react-hooks';
import { getFormValues } from '@/auth/lib/getFormValues';
import { requestPasswordResetEmail } from '@/auth/api/requestPasswordResetEmail';
import { waitFor } from '@adobe/elsie/lib/tests';
import { Provider } from '@/auth/render/Provider';
import { checkIsFunction } from '@/auth/lib/checkIsFunction';
jest.mock('@/auth/lib/checkIsFunction', () => ({
    checkIsFunction: jest.fn(),
}));
jest.mock('@/auth/lib/getFormValues');
jest.mock('@/auth/api/requestPasswordResetEmail');
const wrapper = ({ children }) => <Provider>{children}</Provider>;
const deleteWindowLocation = () => {
    try {
        // @ts-ignore
        delete window.location;
    }
    catch (e) { }
};
describe('[AUTH-hooks] - useResetPasswordForm', () => {
    const mockHandleSetInLineAlertProps = jest.fn();
    const mockOnErrorCallback = jest.fn();
    const mockSetActiveComponent = jest.fn();
    const mockRouteSignIn = jest.fn();
    const originalLocation = window.location;
    afterEach(() => {
        window.location = originalLocation;
    });
    beforeEach(() => {
        jest.clearAllMocks();
        requestPasswordResetEmail.mockResolvedValue({
            success: true,
            message: 'Success',
        });
        deleteWindowLocation();
        window.location = { href: '' };
    });
    test('sets isLoading true when submit is called and false after completion', async () => {
        getFormValues.mockImplementation(() => ({
            email: 'test@example.com',
        }));
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: () => 'https://example.com/signin',
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }), { wrapper });
        expect(result.current.isLoading).toBe(false);
        act(() => {
            result.current.submitResetPassword({ preventDefault: () => { } });
        });
        await waitFor(() => expect(result.current.isLoading).toBe(true));
        await waitFor(() => expect(result.current.isLoading).toBe(false));
    });
    test('calls setActiveComponent if it is a function', () => {
        checkIsFunction.mockReturnValueOnce(true);
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: () => '',
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }), { wrapper });
        act(() => {
            result.current.redirectToSignInPage();
        });
        expect(mockSetActiveComponent).toHaveBeenCalledWith('signInForm');
        expect(window.location.href).toBe('');
    });
    test('redirects to routeSignIn if setActiveComponent is not a function and URL is provided', () => {
        checkIsFunction
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);
        const signInUrl = 'https://example.com/signin';
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: () => signInUrl,
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: undefined,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }), { wrapper });
        act(() => {
            result.current.redirectToSignInPage();
        });
        expect(window.location.href).toBe(signInUrl);
    });
    test('does nothing if setActiveComponent is not a function and routeSignIn is not provided', () => {
        checkIsFunction
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false);
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: () => '',
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: undefined,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }), { wrapper });
        act(() => {
            result.current.redirectToSignInPage();
        });
        expect(window.location.href).toBe('');
    });
    test('calls onErrorCallback and updates notification on failed password reset request', async () => {
        getFormValues.mockImplementation(() => ({
            email: 'test@example.com',
        }));
        requestPasswordResetEmail.mockResolvedValue({
            success: false,
            message: 'An error occurred',
        });
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: () => 'https://example.com/signin',
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }), { wrapper });
        await act(async () => {
            result.current.submitResetPassword({ preventDefault: () => { } });
        });
        expect(mockOnErrorCallback).toHaveBeenCalledWith({
            success: false,
            message: 'An error occurred',
        });
        expect(mockHandleSetInLineAlertProps).toHaveBeenCalledWith({
            type: 'error',
            text: 'An error occurred',
        });
    });
    test('does not call requestPasswordResetEmail if formValues email is null', async () => {
        getFormValues.mockImplementation(() => null);
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: () => 'https://example.com/signin',
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }), { wrapper });
        await act(async () => {
            result.current.submitResetPassword({ preventDefault: () => { } });
        });
        expect(requestPasswordResetEmail).not.toHaveBeenCalled();
    });
    it('calls routeSignIn if checkIsFunction(routeSignIn) returns true', async () => {
        checkIsFunction
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: mockRouteSignIn,
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }));
        await act(async () => {
            result.current.redirectToSignInPage();
        });
        expect(mockSetActiveComponent).not.toHaveBeenCalled();
        expect(checkIsFunction).toHaveBeenCalledWith(mockRouteSignIn);
        expect(mockRouteSignIn).toHaveBeenCalled();
    });
    it('does not call routeSignIn if checkIsFunction(routeSignIn) returns false', async () => {
        checkIsFunction
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false);
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: mockRouteSignIn,
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }));
        await act(async () => {
            result.current.redirectToSignInPage();
        });
        expect(mockSetActiveComponent).not.toHaveBeenCalled();
        expect(mockRouteSignIn).not.toHaveBeenCalled();
    });
    it('calls setActiveComponent if checkIsFunction(setActiveComponent) returns true', async () => {
        checkIsFunction
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);
        const { result } = renderHook(() => useResetPasswordForm({
            routeSignIn: mockRouteSignIn,
            onErrorCallback: mockOnErrorCallback,
            setActiveComponent: mockSetActiveComponent,
            handleSetInLineAlertProps: mockHandleSetInLineAlertProps,
        }));
        await act(async () => {
            result.current.redirectToSignInPage();
        });
        expect(mockSetActiveComponent).toHaveBeenCalledWith('signInForm');
        expect(mockRouteSignIn).not.toHaveBeenCalled();
    });
});
