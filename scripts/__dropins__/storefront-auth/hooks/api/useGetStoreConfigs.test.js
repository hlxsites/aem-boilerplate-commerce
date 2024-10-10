import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@adobe/elsie/lib/tests';
import { useGetStoreConfigs } from '@/auth/hooks/api/useGetStoreConfigs';
import { getStoreConfig } from '@/auth/api';
jest.mock('@/auth/api/getStoreConfig');
describe('[AUTH-hooks] - useGetStoreConfigs', () => {
    test('initially sets passwordConfigs to null', async () => {
        getStoreConfig.mockResolvedValueOnce({
            data: null,
            errors: null,
        });
        const { result } = renderHook(() => useGetStoreConfigs());
        expect(result.current.passwordConfigs).toBeNull();
    });
    test('updates passwordConfigs with data after successful fetch', async () => {
        sessionStorage.removeItem('storeConfig');
        getStoreConfig.mockResolvedValueOnce({
            minLength: 8,
            requiredCharacterClasses: 3,
        });
        const { result } = renderHook(() => useGetStoreConfigs());
        await waitFor(() => {
            expect(result.current.passwordConfigs).toEqual({
                minLength: 8,
                requiredCharacterClasses: 3,
            });
        });
    });
    test('useGetStoreConfigs get data from session storage if possible', async () => {
        sessionStorage.setItem('storeConfig', JSON.stringify({
            minLength: 8,
            requiredCharacterClasses: 3,
        }));
        const { result } = renderHook(() => useGetStoreConfigs());
        await waitFor(() => {
            expect(result.current.passwordConfigs).toEqual({
                minLength: 8,
                requiredCharacterClasses: 3,
            });
        });
    });
    test('1112121212121212121', async () => {
        sessionStorage.removeItem('storeConfig');
        getStoreConfig.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useGetStoreConfigs());
        await waitFor(() => {
            expect(result.current.passwordConfigs).toEqual(null);
        });
    });
});
