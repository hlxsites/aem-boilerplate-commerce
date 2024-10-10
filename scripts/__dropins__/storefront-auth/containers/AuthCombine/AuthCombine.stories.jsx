import { AuthCombine } from '@/auth/containers/AuthCombine';
/**
 * ```ts
 * import AuthCombine from '@dropins/auth/containers/AuthCombine.js';
 * ```
 */
export default {
    title: 'Containers/Auth Combine',
    component: AuthCombine,
    parameters: {
        docs: {
            description: {
                component: `
        The Auth Combine component is designed to manage the switching between

        - login, 
        - registration, 
        - password recovery forms,

        providing a smooth user interface without the need for page reloads. 
        
        It acts as a central controller that uses setActiveComponent to handle the state of different forms. 
        
        While redirectCallback(example - routeSignIn()) is specific to each form and is inactive in Auth Combine. 
        
        This allows users to dynamically switch between forms while maintaining a clear structure and logic without accidental redirects or page reloads.`,
            },
        },
    },
    argTypes: {
        defaultView: {
            control: 'select',
            options: ['signInForm', 'signUpForm', 'resetPasswordForm'],
        },
    },
    decorators: [
        (Story) => (<div style="border:1px solid lightgrey;">
        <Story />
      </div>),
    ],
};
const defaultArgs = {
    defaultView: 'signInForm',
    signInFormConfig: {
        formSize: 'default',
        initialEmailValue: 'init@mail.com',
        renderSignUpLink: true,
    },
    signUpFormConfig: {
        formSize: 'default',
        fieldsConfigForApiVersion1: [],
        apiVersion2: false,
    },
    resetPasswordFormConfig: {
        formSize: 'default',
    },
};
const fullScreenDecorator = (Story) => (<div style={{
        margin: '0 auto',
        maxWidth: '1000px',
        width: '100%',
    }}>
    <Story />
  </div>);
export const SignIn = {
    args: {
        ...defaultArgs,
        defaultView: 'signInForm',
    },
    decorators: [fullScreenDecorator],
};
export const SignUp = {
    args: {
        ...defaultArgs,
        defaultView: 'signUpForm',
    },
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [fullScreenDecorator],
};
export const ResetPassword = {
    args: {
        ...defaultArgs,
        defaultView: 'resetPasswordForm',
    },
};
