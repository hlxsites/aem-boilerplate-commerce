import { renderHook } from '@adobe/elsie/lib/tests';
import { validationUniqueSymbolsPassword } from '@/auth/lib/validationUniqueSymbolsPassword';
import { usePasswordValidationMessage } from '@/auth/hooks/components/usePasswordValidationMessage';
import { Provider } from '@/auth/render/Provider';
jest.mock('@/auth/lib/validationUniqueSymbolsPassword', () => ({
    validationUniqueSymbolsPassword: jest.fn(),
}));
const wrapper = ({ children }) => <Provider>{children}</Provider>;
describe('[AUTH-hooks] - usePasswordValidationMessage', () => {
    const passwordConfigs = {
        requiredCharacterClasses: 2,
        minLength: 8,
    };
    test('should return status pending when password does not meet unique symbols requirement and not clicked submit', () => {
        validationUniqueSymbolsPassword.mockReturnValueOnce(false);
        const { result } = renderHook(() => usePasswordValidationMessage({
            passwordConfigs,
            isClickSubmit: false,
            password: 'password',
        }), { wrapper });
        expect(result.current.isValidUniqueSymbols).toBe('pending');
    });
    test('should return status success when password meets unique symbols requirement', () => {
        validationUniqueSymbolsPassword.mockReturnValueOnce(true);
        const { result } = renderHook(() => usePasswordValidationMessage({
            passwordConfigs,
            isClickSubmit: true,
            password: 'password!',
        }), { wrapper });
        expect(result.current.isValidUniqueSymbols).toBe('success');
    });
    test('should handle empty password on submit click', () => {
        const { result } = renderHook(() => usePasswordValidationMessage({
            passwordConfigs,
            isClickSubmit: true,
            password: '',
        }), { wrapper });
        expect(result.current.isValidUniqueSymbols).toBe('pending');
    });
    test('should return default length message based on password length and submission status', () => {
        const { result } = renderHook(() => usePasswordValidationMessage({
            passwordConfigs,
            isClickSubmit: true,
            password: 'pass',
        }), { wrapper });
        expect(result.current.defaultLengthMessage).toEqual({
            status: 'error',
            icon: 'error',
            message: `At least ${passwordConfigs.minLength} characters long`,
        });
    });
});
