import { Initializer } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { ProductModel, Option } from '../../data/models';

export type OptionsTransformer = (options: Option[]) => Option[];
type ModelConfig = {
    initialData?: any;
    /** @deprecated Use "transformer" instead */
    transform?: (data?: ProductModel) => ProductModel;
    transformer?: (data?: ProductModel) => ProductModel;
    fallbackData?: (parentProduct: any, simpleProduct: ProductModel) => ProductModel;
};
type ProductOptionsConfig = {
    optionsTransformer?: OptionsTransformer;
};
type ConfigProps = {
    scope?: string;
    langDefinitions?: Lang;
    defaultLocale?: string;
    globalLocale?: string;
    sku?: string;
    acdl?: boolean;
    anchors?: string[];
    persistURLParams?: boolean;
    preselectFirstOption?: boolean;
    optionsUIDs?: string[];
    models?: {
        ProductDetails?: ModelConfig;
        ProductOptions?: ProductOptionsConfig;
        [name: string]: ModelConfig | ProductOptionsConfig | undefined;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map