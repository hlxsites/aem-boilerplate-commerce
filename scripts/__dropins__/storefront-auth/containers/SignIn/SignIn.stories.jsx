import { SignIn } from '@/auth/containers/SignIn';
/**
 * ```ts
 * import SignIn from '@dropins/auth/containers/SignIn.js';
 * ```
 */
export default {
    title: 'Containers/Sign In Form',
    component: SignIn,
    argTypes: {
        renderSignUpLink: {
            control: 'boolean',
            description: 'Enables or disables the display of the sign-up link.',
        },
        formSize: {
            control: { type: 'select' },
            options: ['default', 'small'],
            description: 'Determines the initial size of the form.',
        },
        slots: {
            SuccessNotification: {
                control: 'function',
                description: "Renders a notification component to inform the user of a successful action, such as account creation. It accepts a parameter that provides the user's name to customize the notification message.",
                table: {
                    category: 'Functions',
                    type: {
                        summary: '(userName: string) => JSX.Element',
                    },
                    defaultValue: {
                        summary: 'undefined',
                    },
                },
                parameters: {
                    headingText: 'Welcome {userName}',
                    messageText: 'Your account has been successfully created.',
                    primaryButtonText: 'Continue shopping',
                    secondaryButtonText: 'Logout',
                    onPrimaryButtonClick: 'Function to be called on primary button click.',
                    onSecondaryButtonClick: 'Async function to log out the user and redirect to the homepage.',
                },
            },
        },
        initialEmailValue: {
            control: 'text',
            description: 'Sets the initial value for the email field.',
        },
        labels: {
            primaryButtonText: {
                control: 'text',
                description: 'Sets text for primary button.',
            },
            formTitleText: {
                control: 'text',
                description: 'Sets text for sign in form title.',
            },
        },
        hideCloseBtnOnEmailConfirmation: {
            control: 'boolean',
            description: 'Optional, default to false. If provided true - hide "Close" button in Email Confirmation component',
        },
        routeRedirectOnEmailConfirmationClose: {
            defaultValue: () => '/',
            description: 'URL to redirect after click "Close" button in Email Confirmation',
        },
        routeRedirectOnSignIn: {
            defaultValue: () => '/',
            description: 'URL to redirect users after a main action is completed.',
        },
        routeForgotPassword: {
            defaultValue: () => '/',
            description: 'URL to redirect users to the forgot password page.',
        },
        routeSignUp: {
            defaultValue: () => '/',
            description: 'URL to redirect users to the sign-up page.',
        },
        onErrorCallback: {
            action: 'clicked',
            defaultValue: () => {
                console.info('onErrorCallback');
            },
            description: 'Callback function that is called when an error occurs.',
        },
        onSuccessCallback: {
            action: 'clicked',
            defaultValue: () => {
                console.info('onSuccessCallback');
            },
            description: 'Callback function that is called upon a successful action.',
        },
        onSignUpLinkClick: {
            action: 'clicked',
            defaultValue: () => {
                console.info('onSignUpLinkClick');
            },
            description: 'Callback function that is called when the sign-up link is clicked.',
        },
    },
    decorators: [
        (Story) => (<div style="border:1px solid lightgrey;">
        <Story />
      </div>),
    ],
};
export const Default = {
    args: {
        formSize: 'default',
    },
};
export const SmallForm = {
    args: {
        formSize: 'small',
    },
};
export const FullSmallForm = {
    args: {
        formSize: 'small',
        initialEmailValue: 'test@mail.com',
        renderSignUpLink: true,
    },
};
export const FullDefaultForm = {
    args: {
        formSize: 'default',
        initialEmailValue: 'test@mail.com',
        renderSignUpLink: true,
    },
};
