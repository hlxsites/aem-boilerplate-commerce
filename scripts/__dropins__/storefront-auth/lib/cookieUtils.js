/* eslint-disable no-useless-escape */
import { getStoreConfig } from '@/auth/api';
import { COOKIE_LIFETIME } from '@/auth/configs/cookieConfigs';
export const deleteCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
export const getCookiesLifetime = async () => {
    try {
        const storeConfigString = sessionStorage.getItem('storeConfig');
        const cachedStoreConfig = storeConfigString
            ? JSON.parse(storeConfigString)
            : {};
        let accessTokenLifeTime = cachedStoreConfig.customerAccessTokenLifetime;
        if (!accessTokenLifeTime) {
            const storeConfig = await getStoreConfig();
            sessionStorage.setItem('storeConfig', JSON.stringify(storeConfig));
            accessTokenLifeTime =
                storeConfig?.customerAccessTokenLifetime || COOKIE_LIFETIME;
        }
        return `Max-Age=${accessTokenLifeTime}`;
    }
    catch (error) {
        console.error('getCookiesLifetime() Error:', error);
        return `Max-Age=${COOKIE_LIFETIME}`;
    }
};
