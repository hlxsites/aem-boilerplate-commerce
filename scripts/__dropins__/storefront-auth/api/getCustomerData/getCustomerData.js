import { fetchGraphQl, setFetchGraphQlHeader, config } from '@/auth/api';
import { GET_CUSTOMER_DATA } from './graphql/getCustomerData.graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
import { transformCustomerData } from '@/auth/data/transforms';
import { handleFetchError } from '@/auth/lib/fetch-error';
export const getCustomerData = async (user_token) => {
    if (user_token) {
        const { authHeaderConfig } = config.getConfig();
        setFetchGraphQlHeader(authHeaderConfig.header, authHeaderConfig.tokenPrefix
            ? `${authHeaderConfig.tokenPrefix} ${user_token}`
            : user_token);
    }
    return await fetchGraphQl(GET_CUSTOMER_DATA, {
        method: 'GET',
        cache: 'force-cache',
    })
        .then((response) => {
        if (response.errors?.length)
            return handleFetchError(response.errors);
        return transformCustomerData(response);
    })
        .catch(handleNetworkError);
};
