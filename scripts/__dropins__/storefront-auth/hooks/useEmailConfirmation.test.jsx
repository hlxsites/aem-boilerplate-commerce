import { useEmailConfirmation } from '@/auth/hooks/useEmailConfirmation';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@adobe/elsie/lib/tests';
import { confirmEmail } from '@/auth/api/confirmEmail/confirmEmail';
import { Provider } from '@/auth/render/Provider';
const wrapper = ({ children }) => <Provider>{children}</Provider>;
jest.mock('@/auth/api/confirmEmail/confirmEmail');
const deleteWindowLocation = () => {
    try {
        // @ts-ignore
        delete window.location;
    }
    catch (e) { }
};
describe('[AUTH-hooks] - useEmailConfirmation', () => {
    beforeAll(() => {
        deleteWindowLocation();
        Object.defineProperty(window, 'location', {
            value: {
                href: 'https://example.com',
            },
            writable: true,
        });
    });
    test('does not perform email validation if enableEmailConfirmation is false', () => {
        const { result } = renderHook(() => useEmailConfirmation({
            enableEmailConfirmation: false,
        }), { wrapper });
        expect(result.current.emailConfirmationStatusMessage).toStrictEqual({
            text: '',
            status: '',
        });
    });
    test('sets email status message correctly when all URL parameters are present', async () => {
        window.location.search = '?email=test@example.com&key=123';
        confirmEmail.mockReturnValue({
            data: {
                confirmEmail: {
                    customer: {
                        email: 'mail@mail.com',
                    },
                },
            },
        });
        const { result } = renderHook(() => useEmailConfirmation({ enableEmailConfirmation: true }), { wrapper });
        await waitFor(() => {
            expect(result.current.emailConfirmationStatusMessage).toStrictEqual({
                text: 'Congratulations! Your account at mail@mail.com email has been successfully confirmed.',
                status: 'success',
            });
        });
    });
    test('sets email status message to error when confirmation fails', async () => {
        window.location.search = '?email=test@example.com&key=123';
        confirmEmail.mockReturnValue({
            data: {
                confirmEmail: { customer: { email: null } },
            },
            errors: [{ message: 'Confirmation failed' }],
        });
        const { result } = renderHook(() => useEmailConfirmation({ enableEmailConfirmation: true }), { wrapper });
        await waitFor(() => {
            expect(result.current.emailConfirmationStatusMessage).toStrictEqual({
                text: 'Confirmation failed',
                status: 'error',
            });
        });
    });
    test('should not call validateEmailStatus', async () => {
        window.location.search = '?eil=test@example.com&y=123';
        confirmEmail.mockResolvedValue(null);
        const { result } = renderHook(() => useEmailConfirmation({ enableEmailConfirmation: true }));
        expect(result.current.emailConfirmationStatusMessage).toEqual({
            text: '',
            status: '',
        });
    });
    test('called confirmEmail => response null', async () => {
        window.location.search = '?email=test@example.com&key=123';
        confirmEmail.mockReturnValue(null);
        const { result } = renderHook(() => useEmailConfirmation({ enableEmailConfirmation: true }), { wrapper });
        const response = await confirmEmail({
            customerEmail: 'email@mail.com',
            customerConfirmationKey: 'key',
        });
        await waitFor(() => {
            expect(result.current.emailConfirmationStatusMessage).toStrictEqual({
                status: '',
                text: '',
            });
        });
        expect(response).toBeNull();
    });
    test('called setEmailConfirmationStatusMessage without email', async () => {
        window.location.search = '?email=test@example.com&key=123';
        confirmEmail.mockReturnValue({
            data: {
                confirmEmail: {
                    customer: { email: null },
                },
            },
        });
        const { result } = renderHook(() => useEmailConfirmation({ enableEmailConfirmation: true }), { wrapper });
        await waitFor(() => {
            expect(result.current.emailConfirmationStatusMessage).toStrictEqual({
                text: 'Account confirmed',
                status: 'success',
            });
        });
    });
});
