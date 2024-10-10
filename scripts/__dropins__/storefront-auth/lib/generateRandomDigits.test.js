import { generateRandomDigits } from '@/auth/lib/generateRandomDigits';
describe('[AUTH-LIB] - generateRandomDigits', () => {
    test('generates a string of 5 digits', () => {
        const digits = generateRandomDigits();
        expect(digits).toHaveLength(5);
        expect(digits).toMatch(/^\d{5}$/);
    });
    test('generates different values on subsequent calls', () => {
        const firstCall = generateRandomDigits();
        const secondCall = generateRandomDigits();
        expect(firstCall).not.toEqual(secondCall);
    });
});
