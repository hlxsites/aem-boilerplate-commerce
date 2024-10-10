/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { SuccessNotification } from '@/auth/containers/SuccessNotification';
import { Provider } from '@/auth/render/Provider';
const wrapper = ({ children }) => <Provider>{children}</Provider>;
jest.mock('@/auth/components/SuccessNotificationForm', () => {
    const MockSuccessNotificationForm = ({ className, labels, }) => (<div data-testid="mock-status-notification-form" className={className}>
      {labels?.headingText && (<div data-testid="headingText">{labels?.headingText}</div>)}
      {labels?.messageText && (<div data-testid="messageText">{labels?.messageText}</div>)}
      {<button data-testid="primaryButton">
          Continue shopping login user
        </button>}
      {<button data-testid="secondaryButton">Logout</button>}
    </div>);
    MockSuccessNotificationForm.displayName = 'MockSuccessNotificationForm';
    return MockSuccessNotificationForm;
});
describe('[AUTH-containers] - StatusNotification', () => {
    test('renders', () => {
        const { container } = render(<SuccessNotification />);
        expect(!!container).toEqual(true);
    });
    test('renders and passes props correctly to StatusNotificationForm', () => {
        const className = 'custom-class';
        const headingText = 'Test headingText';
        const messageText = 'This is a test content text.';
        const formSize = 'default';
        render(<SuccessNotification className={className} formSize={formSize} slots={undefined} labels={{ headingText, messageText }}/>, { wrapper });
        expect(screen.getByTestId('mock-status-notification-form')).toHaveClass(className);
        expect(screen.getByTestId('headingText')).toHaveTextContent(headingText);
        expect(screen.getByTestId('messageText')).toHaveTextContent(messageText);
        expect(screen.getByTestId('primaryButton')).toHaveTextContent('Continue shopping');
        expect(screen.getByTestId('secondaryButton')).toHaveTextContent('Logout');
    });
});
