import { renderHook } from '@adobe/elsie/lib/tests';
import { act } from 'preact/test-utils';
import { resendConfirmationEmail } from '@/auth/api';
import { useEmailConfirmationForm } from './useEmailConfirmationForm';
import { Provider } from '@/auth/render/Provider';
const wrapper = ({ children }) => <Provider>{children}</Provider>;
jest.mock('@/auth/api', () => ({
    resendConfirmationEmail: jest.fn(),
}));
describe('[AUTH] - useEmailConfirmationForm', () => {
    let handleSetInLineAlertProps;
    beforeEach(() => {
        handleSetInLineAlertProps = jest.fn();
        jest.clearAllMocks();
    });
    test('should set status to success when email is resent successfully', async () => {
        resendConfirmationEmail.mockResolvedValueOnce({
            data: { resendConfirmationEmail: true },
            errors: [],
        });
        const { result } = renderHook(() => useEmailConfirmationForm({
            userEmail: 'test@example.com',
            handleSetInLineAlertProps,
        }), { wrapper });
        await act(async () => {
            await result.current.handleEmailConfirmation();
        });
        expect(handleSetInLineAlertProps).toHaveBeenCalledWith({
            type: 'success',
            text: 'Please check your email for confirmation link.',
        });
        expect(result.current.disabledButton).toBe(false);
    });
    test('should set status to error when email resend fails', async () => {
        resendConfirmationEmail.mockResolvedValueOnce({
            data: { resendConfirmationEmail: false },
            errors: [],
        });
        const { result } = renderHook(() => useEmailConfirmationForm({
            userEmail: 'test@example.com',
            handleSetInLineAlertProps,
        }), { wrapper });
        await act(async () => {
            await result.current.handleEmailConfirmation();
        });
        expect(handleSetInLineAlertProps).toHaveBeenCalledWith({
            type: 'error',
            text: 'Please check your email for confirmation link.',
        });
        expect(result.current.disabledButton).toBe(false);
    });
    test('should not update notification if there are errors in response', async () => {
        resendConfirmationEmail.mockResolvedValueOnce({
            data: null,
            errors: ['Some error'],
        });
        const { result } = renderHook(() => useEmailConfirmationForm({
            userEmail: 'test@example.com',
            handleSetInLineAlertProps,
        }), { wrapper });
        await act(async () => {
            await result.current.handleEmailConfirmation();
        });
        expect(handleSetInLineAlertProps).toHaveBeenCalledWith({
            type: 'error',
            text: 'A technical error occurred while trying to send the email. Please try again later.',
        });
        expect(result.current.disabledButton).toBe(false);
    });
    test('should not call resendConfirmationEmail if userEmail is empty', async () => {
        const { result } = renderHook(() => useEmailConfirmationForm({
            userEmail: '',
            handleSetInLineAlertProps,
        }), { wrapper });
        await act(async () => {
            await result.current.handleEmailConfirmation();
        });
        expect(resendConfirmationEmail).not.toHaveBeenCalled();
        expect(handleSetInLineAlertProps).not.toHaveBeenCalled();
        expect(result.current.disabledButton).toBe(false);
    });
    test('calle if resendConfirmationEmail response null', async () => {
        resendConfirmationEmail.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useEmailConfirmationForm({
            userEmail: 'test@example.com',
            handleSetInLineAlertProps,
        }), { wrapper });
        await act(async () => {
            await result.current.handleEmailConfirmation();
        });
        expect(handleSetInLineAlertProps).not.toHaveBeenCalledWith();
        expect(result.current.disabledButton).toBe(false);
    });
});
