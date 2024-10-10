import { validationUniqueSymbolsPassword } from '@/auth/lib/validationUniqueSymbolsPassword';
describe('[AUTH-LIB] - validationUniqueSymbolsPassword', () => {
    test('validates a password with sufficient unique symbol types', () => {
        const password = 'Aa1!';
        const uniqueSymbolsCount = 4;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(true);
    });
    test('fails a password with insufficient unique symbol types', () => {
        const password = 'Aaa!';
        const uniqueSymbolsCount = 4;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(false);
    });
    test('always validates when uniqueSymbolsCount is 1 or less', () => {
        const password = 'aaa';
        const uniqueSymbolsCount = 1;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(true);
    });
    test('validates a password with exactly the required unique symbol types', () => {
        const password = 'Aa1';
        const uniqueSymbolsCount = 3;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(true);
    });
    test('validates a password with special characters', () => {
        const password = 'Aa1@';
        const uniqueSymbolsCount = 4;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(true);
    });
    test('fails for all lowercase if requiring uppercase', () => {
        const password = 'aaa';
        const uniqueSymbolsCount = 2;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(false);
    });
    test('fails for password without lowercase letters', () => {
        const password = 'AA1!';
        const uniqueSymbolsCount = 4;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(false);
    });
    test('fails for password without numbers', () => {
        const password = 'Aa!';
        const uniqueSymbolsCount = 4;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(false);
    });
    test('fails for password without special symbols', () => {
        const password = 'Aa1';
        const uniqueSymbolsCount = 4;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(false);
    });
    test('validates a password with no special symbols but lower unique count required', () => {
        const password = 'Aa1';
        const uniqueSymbolsCount = 3;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(true);
    });
    test('validates a password with only lowercase letters if required unique count is 1', () => {
        const password = 'aaa';
        const uniqueSymbolsCount = 1;
        const result = validationUniqueSymbolsPassword(password, uniqueSymbolsCount);
        expect(result).toBe(true);
    });
});
