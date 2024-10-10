import { SuccessNotification } from '@/auth/containers/SuccessNotification';
/**
 * ```ts
 * import SuccessNotification from '@dropins/auth/containers/SuccessNotification.js';
 * ```
 */
export default {
    title: 'Containers/Success Notification Form',
    component: SuccessNotification,
    argTypes: {
        formSize: {
            control: { type: 'select' },
            options: ['default', 'small'],
            description: 'Determines the initial size of the form, with "default" being the normal size and "small" for a more compact form.',
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names to style the component.',
        },
        labels: {
            headingText: {
                control: 'text',
                description: 'Sets text success notification header.',
            },
            messageText: {
                control: 'text',
                description: 'Sets text for success notification message.',
            },
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
        labels: {
            headingText: 'Sample Notification',
            messageText: 'This is a sample notification content.',
        },
    },
};
export const SmallWithCustomText = {
    args: {
        formSize: 'small',
        labels: {
            headingText: 'Custom Title',
            messageText: 'Custom content goes here.',
        },
    },
};
