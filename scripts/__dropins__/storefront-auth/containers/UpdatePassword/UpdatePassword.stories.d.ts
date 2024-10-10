import type { Meta } from '@storybook/preact';
import { UpdatePasswordProps } from '@/auth/types';
/**
 * ```ts
 * import UpdatePassword from '@dropins/auth/containers/UpdatePassword.js';
 * ```
 */
declare const _default: Meta<UpdatePasswordProps>;
export default _default;
export declare const SmallSize: {
    args: {
        formSize: string;
    };
    decorators?: import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        signInOnSuccess?: boolean | undefined;
        formSize?: "small" | "default" | undefined;
        routeRedirectOnPasswordUpdate?: (() => string) | undefined;
        routeRedirectOnSignIn?: (() => string) | undefined;
        routeSignInPage?: (() => string) | undefined;
        routeWrongUrlRedirect?: (() => string) | undefined;
        onErrorCallback?: ((value: unknown) => void) | undefined;
        onSuccessCallback?: ((value?: string | undefined) => void) | undefined;
        slots?: {
            SuccessNotification?: import("@adobe/elsie/src/lib").SlotProps<{
                isSuccessful: {
                    userName: string;
                    status: boolean;
                };
            }> | undefined;
        } | undefined;
    }> | import("@storybook/csf").DecoratorFunction<import("@storybook/preact/dist/types-57f4f889").P, {
        signInOnSuccess?: boolean | undefined;
        formSize?: "small" | "default" | undefined;
        routeRedirectOnPasswordUpdate?: (() => string) | undefined;
        routeRedirectOnSignIn?: (() => string) | undefined;
        routeSignInPage?: (() => string) | undefined;
        routeWrongUrlRedirect?: (() => string) | undefined;
        onErrorCallback?: ((value: unknown) => void) | undefined;
        onSuccessCallback?: ((value?: string | undefined) => void) | undefined;
        slots?: {
            SuccessNotification?: import("@adobe/elsie/src/lib").SlotProps<{
                isSuccessful: {
                    userName: string;
                    status: boolean;
                };
            }> | undefined;
        } | undefined;
    }>[] | undefined;
    parameters?: import("@storybook/csf").Parameters | undefined;
    argTypes?: Partial<import("@storybook/csf").ArgTypes<UpdatePasswordProps>> | undefined;
    loaders?: import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps> | import("@storybook/csf").LoaderFunction<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps>[] | undefined;
    beforeEach?: import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps> | import("@storybook/csf").BeforeEach<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps>[] | undefined;
    render?: import("@storybook/csf").ArgsStoryFn<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps> | undefined;
    tags?: string[] | undefined;
    mount?: ((context: import("@storybook/csf").StoryContext<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps>) => () => Promise<import("@storybook/csf").Canvas>) | undefined;
    name?: string | undefined;
    storyName?: string | undefined;
    play?: import("@storybook/csf").PlayFunction<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps> | undefined;
    globals?: import("@storybook/csf").Globals | undefined;
    story?: Omit<import("@storybook/csf").StoryAnnotations<import("@storybook/preact/dist/types-57f4f889").P, UpdatePasswordProps, Partial<UpdatePasswordProps>>, "story"> | undefined;
};
//# sourceMappingURL=UpdatePassword.stories.d.ts.map