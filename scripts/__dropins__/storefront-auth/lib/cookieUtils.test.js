import { deleteCookie, getCookiesLifetime } from '@/auth/lib/cookieUtils';
import { getStoreConfig } from '@/auth/api';
jest.mock('@/auth/api/getStoreConfig');
describe('[AUTH-LIB] - Cookie Utilities', () => {
    beforeEach(() => {
        document.cookie.split(';').forEach((c) => {
            document.cookie = c
                .replace(/^ +/, '')
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
    });
    test('deleteCookie removes a cookie', () => {
        document.cookie = 'toBeDeleted=123456; path=/';
        deleteCookie('toBeDeleted');
        const cookies = document.cookie.split('; ');
        const cookieExists = cookies.some((cookie) => cookie.startsWith('toBeDeleted='));
        expect(cookieExists).toBe(false);
    });
    describe('[Cookie Utilities] - getCookiesLifetime', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        test('should return Max-Age from cached storeConfig if available', async () => {
            const mockCachedStoreConfig = {
                customerAccessTokenLifetime: 3600,
            };
            sessionStorage.setItem('storeConfig', JSON.stringify(mockCachedStoreConfig));
            const result = await getCookiesLifetime();
            expect(result).toBe('Max-Age=3600');
            expect(getStoreConfig).not.toHaveBeenCalled();
        });
        test('should return Max-Age from fetched storeConfig if not available in cache', async () => {
            const mockFetchedStoreConfig = {
                customerAccessTokenLifetime: 3600,
            };
            getStoreConfig.mockResolvedValue(mockFetchedStoreConfig);
            const result = await getCookiesLifetime();
            expect(result).toBe('Max-Age=3600');
            expect(sessionStorage.getItem('storeConfig')).toBe(JSON.stringify(mockFetchedStoreConfig));
        });
        test('should return default Max-Age if an error occurs', async () => {
            getStoreConfig.mockRejectedValue(new Error('Failed to fetch store config'));
            sessionStorage.clear();
            const result = await getCookiesLifetime();
            expect(result).toBe('Max-Age=3600');
            expect(sessionStorage.getItem('storeConfig')).toBeNull();
        });
        test('called COOKIE_LIFETIME value', async () => {
            sessionStorage.removeItem('storeConfig');
            getStoreConfig.mockResolvedValue({
                customerAccessTokenLifetime: undefined,
            });
            const result = await getCookiesLifetime();
            expect(result).toBe(`Max-Age=3600`);
        });
    });
});
