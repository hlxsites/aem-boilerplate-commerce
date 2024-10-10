import { convertKeysCase } from './convertCase';
export const mergeFormObjects = (input, apiVersion2) => {
    const baseKeys = [
        'date_of_birth',
        'dob',
        'email',
        'firstname',
        'gender',
        'is_subscribed',
        'lastname',
        'middlename',
        'password',
        'prefix',
        'suffix',
        'taxvat',
    ];
    const newInputs = convertKeysCase(input, 'snakeCase', {
        firstName: 'firstname',
        lastName: 'lastname',
    });
    if (!apiVersion2)
        return {
            ...newInputs,
            ...(newInputs?.gender ? { gender: Number(newInputs?.gender) } : {}),
        };
    const result = {};
    const customAttributes = [];
    Object.keys(newInputs).forEach((key) => {
        if (baseKeys.includes(key)) {
            result[key] = key.includes('gender')
                ? Number(newInputs[key])
                : newInputs[key];
        }
        else {
            customAttributes.push({
                attribute_code: key,
                value: newInputs[key],
            });
        }
    });
    if (customAttributes.length > 0) {
        result.custom_attributes = customAttributes;
    }
    return result;
};
