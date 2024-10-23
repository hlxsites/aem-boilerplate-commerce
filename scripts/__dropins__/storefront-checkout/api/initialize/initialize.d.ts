import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { Initializer } from '@dropins/tools/types/elsie/src/lib';

export type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        [name: string]: {
            initialData: any;
            transform?: (data?: any) => any;
        };
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map