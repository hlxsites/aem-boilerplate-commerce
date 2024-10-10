export const transformRevokeCustomerToken = (response) => {
    let message = '';
    if (response?.errors?.length)
        message =
            response?.errors[0]?.message || 'Unknown error';
    return {
        message,
        success: Boolean(response?.data?.revokeCustomerToken),
    };
};
