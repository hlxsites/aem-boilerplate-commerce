import { getAttributesForm } from '@/auth/api';
import { useEffect, useState } from 'preact/hooks';
import { DEFAULT_SIGN_UP_FIELDS, } from '@/auth/configs/defaultCreateUserConfigs';
import { simplifyTransformAttributesForm } from '@/auth/lib/simplifyTransformAttributesForm';
const applyDefaultValuesToFields = (fields, defaultValues) => {
    if (!defaultValues?.length)
        return fields;
    return fields.map((el) => {
        const defaultValue = defaultValues.find(({ code }) => code === el.code)?.defaultValue;
        return defaultValue ? { ...el, defaultValue } : el;
    });
};
export const useGetAttributesForm = ({ inputsDefaultValueSet, fieldsConfigForApiVersion1, apiVersion2, }) => {
    const [fieldsListConfigs, setFieldsListConfigs] = useState([]);
    useEffect(() => {
        const fetchFieldsConfig = async () => {
            if (apiVersion2) {
                const response = await getAttributesForm('customer_account_create');
                if (response?.length) {
                    if (inputsDefaultValueSet?.length) {
                        const fieldsWithDefaultValues = applyDefaultValuesToFields(response, inputsDefaultValueSet);
                        setFieldsListConfigs(fieldsWithDefaultValues);
                    }
                    else {
                        setFieldsListConfigs(response);
                    }
                }
            }
            else {
                const transformAttributesFields = simplifyTransformAttributesForm(DEFAULT_SIGN_UP_FIELDS);
                const transformFieldsConfigForApiVersion1 = simplifyTransformAttributesForm(fieldsConfigForApiVersion1);
                const defaultFieldsWithDefaultValues = applyDefaultValuesToFields(transformAttributesFields, inputsDefaultValueSet);
                setFieldsListConfigs(fieldsConfigForApiVersion1 && fieldsConfigForApiVersion1.length
                    ? transformFieldsConfigForApiVersion1
                    : defaultFieldsWithDefaultValues);
            }
        };
        fetchFieldsConfig();
    }, [apiVersion2, fieldsConfigForApiVersion1, inputsDefaultValueSet]);
    return { fieldsListConfigs };
};
