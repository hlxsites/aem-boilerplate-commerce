export const getFormValues = (form) => {
    if (!form)
        return null;
    const formData = new FormData(form);
    if (formData && typeof formData.entries === 'function') {
        const entries = formData.entries();
        if (entries && typeof entries[Symbol.iterator] === 'function') {
            return JSON.parse(JSON.stringify(Object.fromEntries(entries))) || {};
        }
    }
    return {};
};
