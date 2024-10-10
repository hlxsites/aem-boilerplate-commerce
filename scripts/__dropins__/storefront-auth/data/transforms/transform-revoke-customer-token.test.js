// @ts-nocheck
import { transformRevokeCustomerToken } from './transform-revoke-customer-token';
describe('transformRevokeCustomerToken', () => {
    test('should handle a successful response with data correctly', () => {
        const mockResponse = {
            data: {
                revokeCustomerToken: true,
            },
        };
        const result = transformRevokeCustomerToken(mockResponse);
        expect(result).toEqual({
            message: '',
            success: true,
        });
    });
    test('should handle an error response correctly', () => {
        const mockResponse = {
            errors: [{ message: 'Invalid token' }],
        };
        const result = transformRevokeCustomerToken(mockResponse);
        expect(result).toEqual({
            message: 'Invalid token',
            success: false,
        });
    });
    test('should handle an error without a message correctly', () => {
        const mockResponse = {
            errors: [{}],
        };
        const result = transformRevokeCustomerToken(mockResponse);
        expect(result).toEqual({
            message: 'Unknown error',
            success: false,
        });
    });
    test('should handle null or undefined response correctly', () => {
        const result = transformRevokeCustomerToken(null);
        const resultUndefined = transformRevokeCustomerToken(undefined);
        expect(result).toEqual({
            message: '',
            success: false,
        });
        expect(resultUndefined).toEqual({
            message: '',
            success: false,
        });
    });
    test('should handle response without data or errors correctly', () => {
        const mockResponse = {};
        const result = transformRevokeCustomerToken(mockResponse);
        expect(result).toEqual({
            message: '',
            success: false,
        });
    });
});
