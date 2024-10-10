import { fetchGraphQl } from '../fetch-graphql';
import { CREATE_CUSTOMER_ADDRESS } from './graphql/createCustomerAddress.graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
import { handleFetchError } from '@/auth/lib/fetch-error';
export const createCustomerAddress = async (address) => {
    return await fetchGraphQl(CREATE_CUSTOMER_ADDRESS, {
        method: 'POST',
        variables: {
            input: address,
        },
    })
        .then((response) => {
        if (response.errors?.length)
            return handleFetchError(response.errors);
        return response.data.createCustomerAddress.firstname || '';
    })
        .catch(handleNetworkError);
};
