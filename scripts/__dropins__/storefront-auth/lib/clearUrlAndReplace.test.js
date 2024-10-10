import { clearUrlAndReplace } from '@/auth/lib/clearUrlAndReplace';
const deleteWindowLocation = () => {
    try {
        // @ts-ignore
        delete window.location;
    }
    catch (e) { }
};
describe('[AUTH-LIB] - clearUrlAndReplace', () => {
    let originalLocation;
    beforeEach(() => {
        originalLocation = window.location;
        const url = new URL('https://example.com?email=test@example.com&key=123456');
        deleteWindowLocation();
        Object.defineProperty(window, 'location', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: {
                href: url.toString(),
                search: url.search,
                origin: url.origin,
                toString: () => url.toString(),
            },
        });
        window.history.replaceState = jest.fn();
    });
    afterEach(() => {
        window.location = originalLocation;
    });
    test('should remove email and key from URL parameters', () => {
        clearUrlAndReplace();
        expect(window.history.replaceState).toHaveBeenCalledWith({}, document.title, 'https://example.com/');
    });
    test('should not change the URL if email and key are not present', () => {
        const url = new URL('https://example.com/');
        deleteWindowLocation();
        Object.defineProperty(window, 'location', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: {
                href: url.toString(),
                search: url.search,
                origin: url.origin,
                toString: () => url.toString(),
            },
        });
        clearUrlAndReplace();
        expect(window.history.replaceState).not.toHaveBeenCalled();
    });
    test('should handle URLs with other parameters', () => {
        const url = new URL('https://example.com?email=test@example.com&key=123456&otherParam=value');
        deleteWindowLocation();
        Object.defineProperty(window, 'location', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: {
                href: url.toString(),
                search: url.search,
                origin: url.origin,
                toString: () => url.toString(),
            },
        });
        clearUrlAndReplace();
        expect(window.history.replaceState).toHaveBeenCalledWith({}, document.title, 'https://example.com/?otherParam=value');
    });
});
