/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { ResetPassword } from '@/auth/containers/ResetPassword';
jest.mock('@/auth/components/ResetPasswordForm', () => {
    const MockResetPasswordForm = (props) => (<div data-testid="mock-reset-password-form">
      Form Size: {props.formSize}, Redirect URL: {props.routeSignIn()}
    </div>);
    MockResetPasswordForm.displayName = 'MockResetPasswordForm';
    return MockResetPasswordForm;
});
describe('[AUTH-containers] - ResetPassword', () => {
    const routeSignIn = () => 'https://example.com/signin';
    const formSize = 'default';
    const onErrorCallback = jest.fn();
    test('renders', () => {
        render(<ResetPassword routeSignIn={routeSignIn} formSize={formSize} onErrorCallback={onErrorCallback}/>);
        const resetPasswordForm = screen.getByTestId('mock-reset-password-form');
        expect(resetPasswordForm).toBeInTheDocument();
    });
    test('renders and passes props correctly', () => {
        render(<ResetPassword routeSignIn={routeSignIn} formSize={formSize} onErrorCallback={onErrorCallback}/>);
        const resetPasswordForm = screen.getByTestId('mock-reset-password-form');
        expect(resetPasswordForm).toHaveTextContent(`Redirect URL: ${routeSignIn()}`);
    });
});
