import { Initializer } from '@adobe/elsie/lib';
export const initialize = new Initializer({
    init: async (config) => {
        const defaultConfig = {
            authHeaderConfig: {
                header: 'Authorization',
                tokenPrefix: 'Bearer',
            },
        };
        initialize.config.setConfig({ ...defaultConfig, ...config });
    },
    listeners: () => [],
});
export const config = initialize.config;
