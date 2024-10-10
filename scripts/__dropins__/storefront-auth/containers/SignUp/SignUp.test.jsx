/** https://preactjs.com/guide/v10/preact-testing-library/ */
import { render, screen } from '@adobe/elsie/lib/tests';
import '@testing-library/jest-dom';
import { SignUp } from '@/auth/containers/SignUp';
import { DEFAULT_SIGN_UP_FIELDS } from '@/auth/configs/defaultCreateUserConfigs';
jest.mock('@/auth/components/SignUpForm', () => {
    const MockSignUpForm = ({ formSize = 'default', routeRedirectOnSignIn = () => '', routeSignIn = () => '', apiVersion2, fieldsConfigForApiVersion1 = [], }) => (<div data-testid="mock-sign-up-form">
      Form Size: {formSize}, Main Redirect URL: {routeRedirectOnSignIn()},
      SignIn Redirect URL: {routeSignIn()}, API Version:{' '}
      {apiVersion2 ? 'true' : 'false'}, Show User Actions Bar:{' '}
      {fieldsConfigForApiVersion1.map((field, index) => (<div key={index} data-testid="sign-up-field">
          {field.label}
        </div>))}
    </div>);
    MockSignUpForm.displayName = 'MockSignUpForm';
    return MockSignUpForm;
});
describe('[AUTH-containers] - SignUp', () => {
    const formSize = 'default';
    const fieldsConfigForApiVersion1 = DEFAULT_SIGN_UP_FIELDS.slice(0, 3);
    const routeRedirectOnSignIn = () => 'https://main-page.com';
    const routeSignIn = () => 'https://sign-in-page.com';
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();
    test('renders', () => {
        const { container } = render(<SignUp />);
        expect(!!container).toEqual(true);
    });
    test('renders SignUp and passes props correctly to SignUpForm', () => {
        render(<SignUp formSize={formSize} fieldsConfigForApiVersion1={fieldsConfigForApiVersion1} apiVersion2={true} routeRedirectOnSignIn={routeRedirectOnSignIn} routeSignIn={routeSignIn} onErrorCallback={onErrorCallback} onSuccessCallback={onSuccessCallback}/>);
        const signUpForm = screen.getByTestId('mock-sign-up-form');
        expect(signUpForm).toHaveTextContent('Form Size: default');
        expect(signUpForm).toHaveTextContent(`Main Redirect URL: ${routeRedirectOnSignIn()}`);
        expect(signUpForm).toHaveTextContent(`SignIn Redirect URL: ${routeSignIn()}`);
        expect(signUpForm).toHaveTextContent('API Version: true');
        fieldsConfigForApiVersion1.forEach(({ label }) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });
});
