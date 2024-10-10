import type { StoryObj } from '@storybook/preact';
import { FormProps } from '@/auth/types';
declare const _default: {
    title: string;
    component: ({ name, loading, children, className, fieldsConfig, onSubmit, }: FormProps) => import("preact").JSX.Element;
    parameters: {
        layout: string;
    };
    args: {
        name: string;
        loading: boolean;
        className: string;
        fieldsConfig: never[];
        forwardFormRef: null;
    };
    argTypes: {
        forwardFormRef: {
            control: string;
            description: string;
        };
        name: {
            control: string;
            description: string;
        };
        loading: {
            control: string;
            description: string;
        };
        className: {
            control: string;
            description: string;
        };
        fieldsConfig: {
            control: string;
            description: string;
        };
        onSubmit: {
            action: string;
            defaultValue: () => void;
            description: string;
        };
    };
};
export default _default;
export declare const DefaultForm: StoryObj<FormProps>;
//# sourceMappingURL=Form.stories.d.ts.map