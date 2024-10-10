import { publishEvents, pushEvent } from './acdl';
describe('[AUTH-LIB] - AdobeDataLayer', () => {
    let adobeDataLayer;
    beforeEach(() => {
        jest.clearAllMocks();
        sessionStorage.clear();
        adobeDataLayer = [];
        window.adobeDataLayer = adobeDataLayer;
    });
    afterEach(() => {
        delete window.adobeDataLayer;
    });
    test('should return null for unknown event types', () => {
        const result = publishEvents('unknownType', { param: 'value' });
        expect(result).toBeNull();
    });
    test('should push a function to adobeDataLayer', () => {
        pushEvent('testEvent');
        expect(adobeDataLayer.length).toBe(1);
        expect(typeof adobeDataLayer[0]).toBe('function');
    });
    test('should call getState and use its return value if getState exists', () => {
        const mockData = {
            getState: jest.fn().mockReturnValue({ key: 'value' }),
            push: jest.fn(),
        };
        pushEvent('testEvent');
        adobeDataLayer[0](mockData);
        expect(mockData.getState).toHaveBeenCalled();
        expect(mockData.push).toHaveBeenCalledWith({
            event: 'testEvent',
            eventInfo: {
                key: 'value',
            },
        });
    });
    test('should use an empty object if getState does not exist', () => {
        const mockData = {
            push: jest.fn(),
        };
        pushEvent('testEvent');
        adobeDataLayer[0](mockData);
        expect(mockData.push).toHaveBeenCalledWith({
            event: 'testEvent',
            eventInfo: {},
        });
    });
});
