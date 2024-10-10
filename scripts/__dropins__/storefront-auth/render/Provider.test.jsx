import { Provider } from './Provider';
import { events } from '@adobe/event-bus';
import { UIProvider } from '@adobe/elsie/components';
import { render } from '@testing-library/preact';
import en_US from '../i18n/en_US.json';
jest.mock('@adobe/elsie/components/UIProvider', () => ({
    UIProvider: jest.fn(),
}));
describe('Provider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('initial render', async () => {
        render(<Provider>test</Provider>);
        const { children, lang, langDefinitions } = UIProvider.mock
            .calls[0][0];
        expect(children).toBe('test');
        expect(lang).toEqual('en_US');
        expect(langDefinitions.default).toBeDefined();
    });
    test('listen to locale event', async () => {
        events.emit('locale', 'fr_FR');
        render(<Provider>test</Provider>);
        const { children, lang, langDefinitions } = UIProvider.mock
            .calls[1][0];
        expect(children).toBe('test');
        expect(lang).toEqual('fr_FR');
        expect(langDefinitions.default).toEqual({ ...en_US });
    });
});
