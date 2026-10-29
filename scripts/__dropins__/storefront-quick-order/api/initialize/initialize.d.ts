import { Initializer } from '@dropins/tools/lib';
import { Lang } from '@dropins/tools/i18n';
type ConfigProps = {
    langDefinitions?: Lang;
    quickOrderActive?: boolean;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
