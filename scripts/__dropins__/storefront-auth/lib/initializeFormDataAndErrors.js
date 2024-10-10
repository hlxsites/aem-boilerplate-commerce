export default (fieldsConfig) => {
    return fieldsConfig.reduce((acc, { customUpperCode, required, defaultValue }) => {
        if (required && customUpperCode) {
            acc.initialData[customUpperCode] = defaultValue || '';
            acc.errorList[customUpperCode] = '';
        }
        return acc;
    }, {
        initialData: {},
        errorList: {},
    });
};
