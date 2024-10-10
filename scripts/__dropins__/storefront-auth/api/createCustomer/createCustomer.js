import { fetchGraphQl } from '../fetch-graphql';
import { CREATE_CUSTOMER } from './graphql/createCustomer.graphql';
import { CREATE_CUSTOMER_V2 } from './graphql/createCustomerV2.graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
import { setReCaptchaToken } from '@/auth/lib/setReCaptchaToken';
export const createCustomer = async (forms, apiVersion2) => {
    await setReCaptchaToken();
    const response = await fetchGraphQl(apiVersion2 ? CREATE_CUSTOMER_V2 : CREATE_CUSTOMER, {
        method: 'POST',
        variables: {
            input: {
                ...forms,
            },
        },
    }).catch(handleNetworkError);
    return response;
};
