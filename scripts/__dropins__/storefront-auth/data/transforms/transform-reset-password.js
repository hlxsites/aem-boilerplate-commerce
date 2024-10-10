export const transformResetPassword = (response) => {
    let message = '';
    if (response?.errors?.length)
        message = response?.errors[0]?.message;
    return {
        message,
        success: Boolean(response?.data?.resetPassword),
    };
};
