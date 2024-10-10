import { fetchGraphQl } from '../fetch-graphql';
import { GET_ATTRIBUTES_FORM } from './graphql/getAttributesForm.graphql';
import { handleNetworkError } from '@/auth/lib/network-error';
import { transformAttributesForm } from '@/auth/data/transforms';
import { handleFetchError } from '@/auth/lib/fetch-error';
export const getAttributesForm = async (formCode) => {
    return await fetchGraphQl(GET_ATTRIBUTES_FORM, {
        method: 'GET',
        cache: 'force-cache',
        variables: { formCode },
    })
        .then((response) => {
        if (response.errors?.length)
            return handleFetchError(response.errors);
        return transformAttributesForm(response);
    })
        .catch(handleNetworkError);
};
