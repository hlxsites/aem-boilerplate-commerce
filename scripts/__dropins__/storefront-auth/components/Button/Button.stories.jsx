import { Button } from '@/auth/components/Button';
import { ChevronDown as ChevronLeft } from '@adobe/elsie/icons';
export default {
    title: 'Components/UI/Button',
    component: Button,
    args: {
        buttonText: 'Click Me',
        variant: 'primary',
        enableLoader: false,
    },
    argTypes: {
        buttonText: {
            control: 'text',
            description: 'Text displayed on the button.',
        },
        variant: {
            description: 'Change the button style.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
            options: ['primary', 'secondary', 'tertiary'],
            control: 'radio',
        },
        enableLoader: {
            control: 'boolean',
            description: 'Shows loader on button if true.',
        },
        onClick: {
            action: 'clicked',
            defaultValue: () => {
                console.info('onClick event triggered');
            },
            description: 'Function called when the component is clicked. This handler can be used for executing any action upon user interaction with the clickable element.',
        },
    },
};
const Template = {
    render: (args) => <Button {...args}/>,
};
export const Default = {
    ...Template,
    args: {
        buttonText: 'Click Me',
        variant: 'primary',
    },
};
export const WithLoader = {
    ...Template,
    args: {
        ...Default.args,
        enableLoader: true,
        buttonText: 'Loading...',
    },
};
export const SecondaryVariant = {
    ...Template,
    args: {
        ...Default.args,
        variant: 'secondary',
    },
};
export const WithIcon = {
    ...Template,
    args: {
        ...Default.args,
        icon: <ChevronLeft />,
        buttonText: 'With Icon',
        variant: 'secondary',
    },
};
