import type { Meta } from '@storybook/preact';
import { ButtonProps } from '@/auth/components/Button';
declare const _default: Meta<ButtonProps>;
export default _default;
export declare const Default: {
    args: {
        buttonText: string;
        variant: string;
    };
    decorators?: import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }> | import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }>[] | undefined;
    parameters?: import("@storybook/csf").Parameters | undefined;
    argTypes?: Partial<import("@storybook/csf").ArgTypes<ButtonProps>> | undefined;
    loaders?: import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    beforeEach?: import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    render?: import("@storybook/csf").ArgsStoryFn<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    tags?: string[] | undefined;
    mount?: ((context: import("@storybook/csf").StoryContext<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>) => () => Promise<import("@storybook/csf").Canvas>) | undefined;
    name?: string | undefined;
    storyName?: string | undefined;
    play?: import("@storybook/csf").PlayFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    globals?: import("@storybook/csf").Globals | undefined;
    story?: Omit<import("@storybook/csf").StoryAnnotations<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps, Partial<ButtonProps>>, "story"> | undefined;
};
export declare const WithLoader: {
    args: {
        enableLoader: boolean;
        buttonText: string;
        variant: string;
    };
    decorators?: import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }> | import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }>[] | undefined;
    parameters?: import("@storybook/csf").Parameters | undefined;
    argTypes?: Partial<import("@storybook/csf").ArgTypes<ButtonProps>> | undefined;
    loaders?: import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    beforeEach?: import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    render?: import("@storybook/csf").ArgsStoryFn<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    tags?: string[] | undefined;
    mount?: ((context: import("@storybook/csf").StoryContext<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>) => () => Promise<import("@storybook/csf").Canvas>) | undefined;
    name?: string | undefined;
    storyName?: string | undefined;
    play?: import("@storybook/csf").PlayFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    globals?: import("@storybook/csf").Globals | undefined;
    story?: Omit<import("@storybook/csf").StoryAnnotations<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps, Partial<ButtonProps>>, "story"> | undefined;
};
export declare const SecondaryVariant: {
    args: {
        variant: string;
        buttonText: string;
    };
    decorators?: import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }> | import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }>[] | undefined;
    parameters?: import("@storybook/csf").Parameters | undefined;
    argTypes?: Partial<import("@storybook/csf").ArgTypes<ButtonProps>> | undefined;
    loaders?: import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    beforeEach?: import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    render?: import("@storybook/csf").ArgsStoryFn<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    tags?: string[] | undefined;
    mount?: ((context: import("@storybook/csf").StoryContext<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>) => () => Promise<import("@storybook/csf").Canvas>) | undefined;
    name?: string | undefined;
    storyName?: string | undefined;
    play?: import("@storybook/csf").PlayFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    globals?: import("@storybook/csf").Globals | undefined;
    story?: Omit<import("@storybook/csf").StoryAnnotations<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps, Partial<ButtonProps>>, "story"> | undefined;
};
export declare const WithIcon: {
    args: {
        icon: import("preact").JSX.Element;
        buttonText: string;
        variant: string;
    };
    decorators?: import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }> | import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        type: "button" | "submit";
        variant?: "primary" | "secondary" | "tertiary" | undefined;
        className?: string | undefined;
        buttonText: string;
        enableLoader?: boolean | undefined;
        onClick?: ((event: MouseEvent) => void) | undefined;
        style?: Record<string, string | number> | undefined;
        icon?: import("preact").VNode<import("preact/compat").HTMLAttributes<SVGSVGElement>> | undefined;
        disabled?: boolean | undefined;
    }>[] | undefined;
    parameters?: import("@storybook/csf").Parameters | undefined;
    argTypes?: Partial<import("@storybook/csf").ArgTypes<ButtonProps>> | undefined;
    loaders?: import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    beforeEach?: import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>[] | undefined;
    render?: import("@storybook/csf").ArgsStoryFn<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    tags?: string[] | undefined;
    mount?: ((context: import("@storybook/csf").StoryContext<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps>) => () => Promise<import("@storybook/csf").Canvas>) | undefined;
    name?: string | undefined;
    storyName?: string | undefined;
    play?: import("@storybook/csf").PlayFunction<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps> | undefined;
    globals?: import("@storybook/csf").Globals | undefined;
    story?: Omit<import("@storybook/csf").StoryAnnotations<import("@storybook/preact/dist/types-57f4f889").P, ButtonProps, Partial<ButtonProps>>, "story"> | undefined;
};
//# sourceMappingURL=Button.stories.d.ts.map