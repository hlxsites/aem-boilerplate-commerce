import { convertKeysCase, convertToCamelCase } from '@/auth/lib/convertCase';
export const cloneArrayIfExists = (fields) => {
    let multilineItems = [];
    for (const element of fields) {
        if (element.frontend_input !== 'MULTILINE' || element.multiline_count < 2) {
            continue;
        }
        for (let i = 2; i <= element.multiline_count; i++) {
            const newItem = {
                ...element,
                is_required: false,
                name: `${element.code}_multiline_${i}`,
                code: `${element.code}_multiline_${i}`,
                id: `${element.code}_multiline_${i}`,
            };
            multilineItems.push(newItem);
        }
    }
    return multilineItems;
};
export const transformAttributesForm = (response) => {
    const items = response?.data?.attributesForm?.items || [];
    if (!items.length)
        return [];
    const fields = items
        .filter((el) => !el.frontend_input?.includes('HIDDEN'))
        ?.map(({ code, ...other }) => {
        const isDefaultCode = code !== 'country_id' ? code : 'country_code';
        return {
            ...other,
            name: isDefaultCode,
            id: isDefaultCode,
            code: isDefaultCode,
        };
    });
    const multilineItems = cloneArrayIfExists(fields);
    const attributesConfig = fields
        .concat(multilineItems)
        .map((item) => {
        const customUpperCode = item.code === 'firstname'
            ? 'firstName'
            : item.code === 'lastname'
                ? 'lastName'
                : convertToCamelCase(item.code);
        const options = item.options?.map((el) => {
            return {
                isDefault: el.is_default,
                text: el.label,
                value: el.value,
            };
        });
        return convertKeysCase({ ...item, options, customUpperCode }, 'camelCase', {
            frontend_input: 'fieldType',
            frontend_class: 'className',
            is_required: 'required',
            sort_order: 'orderNumber',
        });
    })
        .sort((a, b) => a.orderNumber - b.orderNumber);
    return attributesConfig;
};
