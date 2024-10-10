/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { UpdatePassword } from '@/auth/containers/UpdatePassword';
jest.mock('@/auth/components/UpdatePasswordForm', () => {
    const MockUpdatePasswordForm = ({ formSize, routeWrongUrlRedirect = () => '', routeRedirectOnSignIn = () => '', }) => (<div data-testid="mock-update-password-form">
      Form Size: {formSize}, Main Redirect URL: {routeRedirectOnSignIn()}, Error
      Redirect URL: {routeWrongUrlRedirect()}, Logout Redirect URL:{' '}
    </div>);
    MockUpdatePasswordForm.displayName = 'MockUpdatePasswordForm';
    return MockUpdatePasswordForm;
});
describe('Auth/Containers/UpdatePassword', () => {
    const formSize = 'default';
    const routeRedirectOnSignIn = () => 'https://main-page.com';
    const routeWrongUrlRedirect = () => 'https://error-page.com';
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();
    test('renders', () => {
        const { container } = render(<UpdatePassword />);
        expect(!!container).toEqual(true);
    });
    test('renders and passes props correctly to UpdatePasswordForm', () => {
        render(<UpdatePassword formSize={formSize} routeRedirectOnSignIn={routeRedirectOnSignIn} routeWrongUrlRedirect={routeWrongUrlRedirect} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>);
        const updatePasswordForm = screen.getByTestId('mock-update-password-form');
        expect(updatePasswordForm).toHaveTextContent('Form Size: default');
        expect(updatePasswordForm).toHaveTextContent(`Main Redirect URL: ${routeRedirectOnSignIn()}`);
        expect(updatePasswordForm).toHaveTextContent(`Error Redirect URL: ${routeWrongUrlRedirect()}`);
    });
});
