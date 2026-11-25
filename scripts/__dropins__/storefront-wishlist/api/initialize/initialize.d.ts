import { Initializer } from '@dropins/tools/lib';
import { Lang } from '../../../node_modules/@dropins/tools/src/i18n';
type ConfigProps = {
    langDefinitions?: Lang;
    isGuestWishlistEnabled?: boolean;
    storeCode?: string;
    pageSize?: number;
    guestWishlistTtl?: Record<string, number>;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
