export const transformCustomerData = (response) => {
    return {
        email: response?.data?.customer?.email || '',
        firstname: response?.data?.customer?.firstname || '',
        lastname: response?.data?.customer?.lastname || '',
    };
};
