import { convertToInputDateFormat } from '@/auth/lib/convertToInputDateFormat';
describe('[AUTH-LIB] - convertToInputDateFormat', () => {
    test('correctly formats a date string with two-digit month and day', () => {
        const date = '2023-12-25';
        const formattedDate = convertToInputDateFormat(date);
        expect(formattedDate).toBe('2023-12-25');
    });
    test('adds leading zeros to one-digit month and day', () => {
        const date = '2023-1-5';
        const formattedDate = convertToInputDateFormat(date);
        expect(formattedDate).toBe('2023-01-05');
    });
    test('returns an empty string when input is an empty string', () => {
        const date = '';
        const formattedDate = convertToInputDateFormat(date);
        expect(formattedDate).toBe('');
    });
    test('handles invalid input by returning an empty string', () => {
        const date = 'invalid-date';
        const formattedDate = convertToInputDateFormat(date);
        expect(formattedDate).toBe('');
    });
});
