import { ResetPassword } from '@/auth/containers/ResetPassword';
/**
 * ```ts
 * import ResetPassword from '@dropins/auth/containers/ResetPassword.js';
 * ```
 */
export default {
    title: 'Containers/Reset Password',
    component: ResetPassword,
    argTypes: {
        formSize: {
            control: 'radio',
            defaultValue: 'default',
            options: ['default', 'small'],
            description: 'Sets the initial size of the form.',
        },
        routeSignIn: {
            defaultValue: () => '/',
            description: 'URL to redirect users to the sign-in page.',
        },
        onErrorCallback: {
            action: 'clicked',
            defaultValue: () => {
                console.log('onErrorCallback');
            },
            description: 'Function to be called when an error occurs.',
        },
    },
};
const Template = {
    render: (args) => <ResetPassword {...args}/>,
};
export const SmallSize = {
    ...Template,
    args: {
        formSize: 'small',
    },
    decorators: [
        (Story) => (<div style="border:1px solid lightgrey;">
        <Story />
      </div>),
    ],
};
