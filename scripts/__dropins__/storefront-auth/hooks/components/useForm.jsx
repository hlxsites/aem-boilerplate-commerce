import { useCallback, useRef, useState, useEffect } from 'preact/hooks';
import { useText } from '@adobe/elsie/i18n';
import { initReCaptcha } from '@adobe/recaptcha';
import initializeFormDataAndErrors from '@/auth/lib/initializeFormDataAndErrors';
import { validationFields, } from '@/auth/lib/validationFields';
export const useForm = ({ fieldsConfig, onSubmit }) => {
    const translations = useText({
        requiredFieldError: 'Auth.FormText.requiredFieldError',
        lengthTextError: 'Auth.FormText.lengthTextError',
        numericError: 'Auth.FormText.numericError',
        alphaNumWithSpacesError: 'Account.FormText.alphaNumWithSpacesError',
        alphaNumericError: 'Auth.FormText.alphaNumericError',
        alphaError: 'Auth.FormText.alphaError',
        emailError: 'Auth.FormText.emailError',
        dateError: 'Auth.FormText.dateError',
        dateLengthError: 'Auth.FormText.dateLengthError',
        dateMaxError: 'Auth.FormText.dateMaxError',
        dateMinError: 'Auth.FormText.dateMinError',
        urlError: 'Auth.FormText.urlError',
    });
    const formRef = useRef(null);
    const focusExecutedRef = useRef(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const handleValidationSubmit = useCallback((disableShowError = false) => {
        let formValid = true;
        const errorsList = { ...errors };
        let firstErrorField = null;
        for (const [name, value] of Object.entries(formData)) {
            const fieldConfig = fieldsConfig?.find((config) => config?.customUpperCode?.includes(name));
            const validationResult = validationFields(value.toString(), fieldConfig, translations, errorsList);
            if (validationResult[name]) {
                Object.assign(errorsList, validationResult);
                formValid = false;
            }
            if (!firstErrorField) {
                firstErrorField =
                    Object.keys(errorsList).find((key) => errorsList[key]) || null;
            }
        }
        if (!disableShowError) {
            setErrors(errorsList);
        }
        if (firstErrorField && formRef.current && !disableShowError) {
            const input = formRef.current.elements.namedItem(firstErrorField);
            input?.focus();
        }
        return formValid;
    }, [errors, fieldsConfig, formData, translations]);
    useEffect(() => {
        if (fieldsConfig?.length) {
            const { initialData, errorList } = initializeFormDataAndErrors(fieldsConfig);
            setFormData((prev) => ({
                ...initialData,
                ...prev,
            }));
            setErrors(errorList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(fieldsConfig)]);
    const handleFocus = useCallback(async () => {
        if (!focusExecutedRef.current) {
            await initReCaptcha(0);
            focusExecutedRef.current = true;
        }
    }, []);
    const handleChange = useCallback((event) => {
        const { name, value, type, checked } = event?.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData((prev) => {
            const updatedFormData = {
                ...prev,
                [name]: fieldValue,
            };
            return updatedFormData;
        });
        const fieldConfig = fieldsConfig?.find((config) => config?.customUpperCode?.includes(name));
        let errorsList = { ...errors };
        if (fieldConfig) {
            const validationResult = validationFields(fieldValue.toString(), fieldConfig, translations, errorsList);
            if (validationResult) {
                Object.assign(errorsList, validationResult);
            }
            setErrors(errorsList);
        }
    }, [fieldsConfig, errors, translations]);
    const handleBlur = useCallback((event) => {
        const { name, value, type, checked } = event?.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        const fieldConfig = fieldsConfig?.find((config) => config.customUpperCode === name);
        if (fieldConfig) {
            const errorsList = { ...errors };
            const validationResult = validationFields(fieldValue.toString(), fieldConfig, translations, errorsList);
            if (validationResult) {
                Object.assign(errorsList, validationResult);
            }
            setErrors(errorsList);
        }
    }, [errors, fieldsConfig, translations]);
    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const formValid = handleValidationSubmit();
        onSubmit?.(event, formValid);
    }, [handleValidationSubmit, onSubmit]);
    return {
        formData,
        errors,
        formRef,
        handleChange,
        handleBlur,
        handleSubmit,
        handleFocus,
    };
};
