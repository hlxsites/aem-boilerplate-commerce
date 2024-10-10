import { events } from '@adobe/event-bus';
/**
 * A function which can be attached to fetchGraphQL to handle thrown errors in
 * a generic way.
 */
export const handleNetworkError = (error) => {
    const isAbortError = error instanceof DOMException && error.name === 'AbortError';
    if (!isAbortError) {
        events.emit('auth/error', {
            source: 'auth',
            type: 'network',
            error,
        });
    }
    throw error;
};
