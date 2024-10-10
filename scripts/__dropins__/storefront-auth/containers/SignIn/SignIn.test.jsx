/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { SignIn } from '@/auth/containers/SignIn';
jest.mock('@/auth/components/SignInForm', () => {
    const MockSignInForm = ({ formSize = 'default', routeRedirectOnSignIn = () => '', routeForgotPassword = () => '', }) => (<div data-testid="mock-sign-in-form">
      {<div>Show User Actions Bar</div>}
      Form Size: {formSize}, Main Redirect URL: {routeRedirectOnSignIn()},
      Forgot Password Redirect URL: {routeForgotPassword()}
    </div>);
    MockSignInForm.displayName = 'MockSignInForm';
    return MockSignInForm;
});
describe('[AUTH-containers] - SignIn', () => {
    const routeRedirectOnSignIn = () => 'https://main-page.com';
    const routeForgotPassword = () => 'https://forgot-password-page.com';
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();
    test('renders', () => {
        const { container } = render(<SignIn />);
        expect(!!container).toEqual(true);
    });
    test('renders SignIn and passes props correctly to SignInForm', () => {
        render(<SignIn formSize="small" routeRedirectOnSignIn={routeRedirectOnSignIn} routeForgotPassword={routeForgotPassword} onSuccessCallback={onSuccessCallback} onErrorCallback={onErrorCallback}/>);
        const signInForm = screen.getByTestId('mock-sign-in-form');
        expect(signInForm).toHaveTextContent('Show User Actions Bar');
        expect(signInForm).toHaveTextContent('Form Size: small');
        expect(signInForm).toHaveTextContent(`Main Redirect URL: ${routeRedirectOnSignIn()}`);
        expect(signInForm).toHaveTextContent(`Forgot Password Redirect URL: ${routeForgotPassword()}`);
    });
});
