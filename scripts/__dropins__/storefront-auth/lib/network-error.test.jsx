import { events } from '@adobe/event-bus';
import { handleNetworkError } from './network-error';
jest.mock('@adobe/event-bus', () => ({
    events: {
        emit: jest.fn(),
    },
}));
describe('handleNetworkError', () => {
    test('should ignore AbortErrors', () => {
        const error = new DOMException('AbortError', 'AbortError');
        expect(() => handleNetworkError(error)).toThrow(error);
        expect(events.emit).not.toHaveBeenCalled();
    });
    test('should emit an event for other errors', () => {
        const error = new DOMException('NetworkError', 'NetworkError');
        expect(() => handleNetworkError(error)).toThrow(error);
        expect(events.emit).toHaveBeenCalledWith('auth/error', {
            source: 'auth',
            type: 'network',
            error,
        });
    });
});
