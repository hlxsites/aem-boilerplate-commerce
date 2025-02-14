import { StorefrontConfig, StorefrontDetails } from '../../types/storefront';
import { PropsWithChildren } from 'preact/compat';

export type StorefrontContextState = {
    details?: StorefrontDetails;
    config: StorefrontConfig;
};
export declare const StorefrontContext: import('preact').Context<StorefrontContextState | null>;
export type StorefrontProviderProps = PropsWithChildren<{
    details?: StorefrontDetails;
}>;
/** The StorefrontProvider provides a configuration, validates the storeconfig if given, and configures the fetch-graphql url  */
export declare function StorefrontProvider({ children, details }: StorefrontProviderProps): import("preact/compat").JSX.Element;
//# sourceMappingURL=StorefrontContext.d.ts.map