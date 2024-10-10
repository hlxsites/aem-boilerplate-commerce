import { transformAttributesForm } from '../data/transforms';
export const simplifyTransformAttributesForm = (defaultSignUpFields) => {
    if (!defaultSignUpFields?.length)
        return [];
    const params = {
        data: {
            attributesForm: { items: defaultSignUpFields },
        },
    };
    return transformAttributesForm(params);
};
