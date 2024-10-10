export const convertToCamelCase = (key) => {
    return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
export const convertToSnakeCase = (key) => {
    return key.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);
};
export const convertKeysCase = (data, type, dictionary) => {
    const typeList = ['string', 'boolean', 'number'];
    const callback = type === 'camelCase' ? convertToCamelCase : convertToSnakeCase;
    if (Array.isArray(data)) {
        return data.map((element) => {
            if (typeList.includes(typeof element) || element === null)
                return element;
            if (typeof element === 'object') {
                return convertKeysCase(element, type, dictionary);
            }
            return element;
        });
    }
    if (data !== null && typeof data === 'object') {
        return Object.entries(data).reduce((acc, [key, value]) => {
            const newKey = dictionary && dictionary[key] ? dictionary[key] : callback(key);
            acc[newKey] =
                typeList.includes(typeof value) || value === null
                    ? value
                    : convertKeysCase(value, type, dictionary);
            return acc;
        }, {});
    }
    return data;
};
