// @ts-nocheck
import { transformResetPassword } from './transform-reset-password';
describe('transformResetPassword', () => {
    test('extracts message from the first error when errors are present', () => {
        const response = {
            errors: [{ message: 'User not found' }],
        };
        const result = transformResetPassword(response);
        expect(result).toEqual({
            message: 'User not found',
            success: false,
        });
    });
    test('returns success true when resetPassword is true', () => {
        const response = {
            data: {
                resetPassword: true,
            },
        };
        const result = transformResetPassword(response);
        expect(result).toEqual({
            message: '',
            success: true,
        });
    });
    test('returns success false when resetPassword is false', () => {
        const response = {
            data: {
                resetPassword: false,
            },
        };
        const result = transformResetPassword(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
    test('handles response being null', () => {
        const response = null;
        const result = transformResetPassword(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
    test('handles response without errors or data', () => {
        const response = {};
        const result = transformResetPassword(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
    test('handles response with an empty errors array', () => {
        const response = {
            errors: [],
        };
        const result = transformResetPassword(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
});
