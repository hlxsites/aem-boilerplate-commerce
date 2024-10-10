import { fetchGraphQl } from '../fetch-graphql';
import { GET_STORE_CONFIG } from './graphql/getStoreConfig.graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
import { transformStoreConfig } from '@/auth/data/transforms';
import { handleFetchError } from '@/auth/lib/fetch-error';
export const getStoreConfig = async () => {
    return await fetchGraphQl(GET_STORE_CONFIG, {
        method: 'GET',
        cache: 'force-cache',
    })
        .then((response) => {
        if (response.errors?.length)
            return handleFetchError(response.errors);
        return transformStoreConfig(response);
    })
        .catch(handleNetworkError);
};
