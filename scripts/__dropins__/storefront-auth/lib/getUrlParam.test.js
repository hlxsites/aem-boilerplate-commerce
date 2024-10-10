import { getUrlParam } from '@/auth/lib/getUrlParam';
describe('[AUTH-LIB] - getUrlParam', () => {
    const defaultURL = 'https://example.com?param1=value1&param2=value2';
    test('extracts parameter value from URL', () => {
        const value = getUrlParam(defaultURL, 'param1');
        expect(value).toBe('value1');
    });
    test('returns undefined for non-existent parameter', () => {
        const value = getUrlParam(defaultURL, 'param3');
        expect(value).toBeUndefined();
    });
    test('correctly extracts parameter when multiple parameters present', () => {
        const value = getUrlParam(`${defaultURL}&param3=value3`, 'param2');
        expect(value).toBe('value2');
    });
    test('correctly handles multiple instances of the same parameter', () => {
        const url = 'https://example.com?param1=value1&param1=value2&param2=value3';
        const value = getUrlParam(url, 'param1');
        expect(value).toBe('value1');
    });
    test('correctly extracts parameter with special characters in value', () => {
        const url = 'https://example.com?param1=special%20value%21&param2=value2';
        const value = getUrlParam(url, 'param1');
        expect(value).toBe('special%20value%21');
    });
});
