/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { fireEvent, render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { SuccessNotificationForm } from '@/auth/components/SuccessNotificationForm';
import { revokeCustomerToken } from '@/auth/api';
import { Button } from '@adobe/elsie/components';
jest.mock('@/auth/api', () => ({
    revokeCustomerToken: jest.fn(),
}));
const deleteWindowLocation = () => {
    try {
        // @ts-ignore
        delete window.location;
    }
    catch (e) { }
};
describe('[AUTH-components] - SuccessNotificationForm', () => {
    const originalLocation = window.location;
    afterEach(() => {
        window.location = originalLocation;
    });
    beforeEach(() => {
        jest.clearAllMocks();
        deleteWindowLocation();
        window.location = { href: '' };
    });
    test('renders', () => {
        const { container } = render(<SuccessNotificationForm />);
        expect(!!container).toEqual(true);
    });
    test('renders heading and message text correctly', async () => {
        const headingText = 'Test Title';
        const messageText = 'Test content text.';
        render(<SuccessNotificationForm labels={{ headingText, messageText }}/>);
        expect(screen.getByTestId('notification-title')).toHaveTextContent(headingText);
        expect(screen.getByTestId('notification-content')).toHaveTextContent(messageText);
    });
    test('renders buttons with provided texts', () => {
        render(<SuccessNotificationForm />);
        expect(screen.getByText('Continue shopping')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });
    it('should navigate to "/" when the button is clicked primaryButton', () => {
        render(<SuccessNotificationForm slots={{}}/>);
        const button = screen.getByTestId('primaryButton');
        fireEvent.click(button);
        expect(window.location.href).toBe('/');
    });
    it('should navigate to "/" when the button is clicked secondaryButton', () => {
        revokeCustomerToken.mockResolvedValue('');
        render(<SuccessNotificationForm slots={{}}/>);
        const button = screen.getByTestId('secondaryButton');
        fireEvent.click(button);
        expect(window.location.href).toBe('');
    });
    it('render Slot', () => {
        revokeCustomerToken.mockResolvedValue('');
        render(<SuccessNotificationForm 
        // @ts-ignore
        slots={{ SuccessNotificationActions: () => <Button>Test</Button> }}/>);
        const successNotificationActions = screen.getByTestId('successNotificationActions');
        expect(successNotificationActions).toBeInTheDocument();
    });
});
