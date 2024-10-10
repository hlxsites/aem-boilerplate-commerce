import { checkIsFunction } from '@/auth/lib/checkIsFunction';
describe('[AUTH-LIB] - checkIsFunction', () => {
    test('should return true for a function', () => {
        const func = () => { };
        expect(checkIsFunction(func)).toBe(true);
    });
    test('should return false for a string', () => {
        const string = 'I am not a function';
        expect(checkIsFunction(string)).toBe(false);
    });
    test('should return false for an object', () => {
        const obj = {};
        expect(checkIsFunction(obj)).toBe(false);
    });
    test('should return false for a number', () => {
        const num = 123;
        expect(checkIsFunction(num)).toBe(false);
    });
    test('should return false for null', () => {
        const nullValue = null;
        expect(checkIsFunction(nullValue)).toBe(false);
    });
    test('should return false for undefined', () => {
        const undefinedValue = undefined;
        expect(checkIsFunction(undefinedValue)).toBe(false);
    });
    test('should return false for an array', () => {
        const array = [];
        expect(checkIsFunction(array)).toBe(false);
    });
    test('should return false for a boolean', () => {
        const bool = true;
        expect(checkIsFunction(bool)).toBe(false);
    });
});
