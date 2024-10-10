// @ts-nocheck
import { transformPasswordResetEmail } from './transform-password-reset-email';
describe('transformPasswordResetEmail', () => {
    test('extracts message from the first error when errors are present', () => {
        const response = {
            errors: [{ message: 'User not found' }],
        };
        const result = transformPasswordResetEmail(response);
        expect(result).toEqual({
            message: 'User not found',
            success: false,
        });
    });
    test('returns success true when requestPasswordResetEmail is true', () => {
        const response = {
            data: {
                requestPasswordResetEmail: true,
            },
        };
        const result = transformPasswordResetEmail(response);
        expect(result).toEqual({
            message: '',
            success: true,
        });
    });
    test('returns success false when requestPasswordResetEmail is false', () => {
        const response = {
            data: {
                requestPasswordResetEmail: false,
            },
        };
        const result = transformPasswordResetEmail(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
    test('handles response being null', () => {
        const response = null;
        const result = transformPasswordResetEmail(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
    test('handles response without errors or data', () => {
        const response = {};
        const result = transformPasswordResetEmail(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
    test('handles response with an empty errors array', () => {
        const response = {
            errors: [],
        };
        const result = transformPasswordResetEmail(response);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
});
