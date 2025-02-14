import { PropsWithChildren } from 'preact/compat';
import { ProductDataModel } from '../../data/models/product';
import { StorefrontConfig, StorefrontDetails, StorefrontRouteParams } from '../../types/storefront';
import { Container } from '@dropins/tools/types/elsie/src/lib';

export type PopoverContextState = {
    products: ProductDataModel[];
    config: StorefrontConfig;
    route(params: StorefrontRouteParams): string;
};
export declare const PopoverContext: import('preact').Context<PopoverContextState>;
/** The initial props passed into the dropin */
export type SearchPopoverProps = PropsWithChildren<{
    storefrontDetails: StorefrontDetails;
}>;
export declare const SearchPopover: Container<SearchPopoverProps>;
//# sourceMappingURL=SearchPopover.d.ts.map