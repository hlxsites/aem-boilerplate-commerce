import { setEndpoint, setFetchGraphQlHeader, removeFetchGraphQlHeader, setFetchGraphQlHeaders, fetchGraphQl, getConfig, } from './fetch-graphql';
describe('fetch-graphql', () => {
    test('should return a methods', async () => {
        expect(typeof setEndpoint).toBe('function');
        expect(typeof setFetchGraphQlHeader).toBe('function');
        expect(typeof removeFetchGraphQlHeader).toBe('function');
        expect(typeof setFetchGraphQlHeaders).toBe('function');
        expect(typeof fetchGraphQl).toBe('function');
        expect(typeof getConfig).toBe('function');
    });
});
