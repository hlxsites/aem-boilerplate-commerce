/** Actions */
export const handleFetchError = (errors) => {
    const errorMessage = errors.map((e) => e.message).join(' ');
    throw Error(errorMessage);
};
