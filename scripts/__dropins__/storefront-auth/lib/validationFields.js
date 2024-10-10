var ConfigEnumLength;
(function (ConfigEnumLength) {
    ConfigEnumLength["MIN_TEXT_LENGTH"] = "MIN_TEXT_LENGTH";
    ConfigEnumLength["MAX_TEXT_LENGTH"] = "MAX_TEXT_LENGTH";
    ConfigEnumLength["DATE_RANGE_MIN"] = "DATE_RANGE_MIN";
    ConfigEnumLength["DATE_RANGE_MAX"] = "DATE_RANGE_MAX";
})(ConfigEnumLength || (ConfigEnumLength = {}));
export var InputValidation;
(function (InputValidation) {
    InputValidation["Numeric"] = "numeric";
    InputValidation["AlphanumWithSpaces"] = "alphanum-with-spaces";
    InputValidation["Alphanumeric"] = "alphanumeric";
    InputValidation["Alpha"] = "alpha";
    InputValidation["Email"] = "email";
    InputValidation["Length"] = "length";
    InputValidation["Date"] = "date";
    InputValidation["Url"] = "url";
})(InputValidation || (InputValidation = {}));
const flattenObjectsArray = (arr) => {
    return arr.reduce((acc, obj) => {
        return { ...acc, [obj.name]: obj.value };
    }, {});
};
//The basic material for the functions responsible for validation was taken from https://github.com/magento/magento2/blob/2.4/app/code/Magento/Ui/view/base/web/js/lib/validation/rules.js
export const validateNumeric = (value) => /^\d+$/.test(value);
export const validateAlphanumWithSpaces = (value) => /^[a-zA-Z0-9\s]+$/.test(value);
export const validateAlphanumeric = (value) => /^[a-zA-Z0-9]+$/.test(value);
export const validateAlpha = (value) => /^[a-zA-Z]+$/.test(value);
export const validateEmail = (value) => /^[a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]+(\.[a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]+)*@([a-z0-9-]+\.)+[a-z]{2,}$/i.test(value);
export const validateDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
export const isDateWithinRange = (date, minTimestamp, maxTimestamp) => {
    const dateTimestamp = new Date(date).getTime() / 1000;
    if (isNaN(dateTimestamp) || dateTimestamp < 0) {
        return false;
    }
    if (typeof minTimestamp !== 'undefined' && dateTimestamp < minTimestamp) {
        return false;
    }
    if (typeof maxTimestamp !== 'undefined' && dateTimestamp > maxTimestamp) {
        return false;
    }
    return true;
};
export const convertTimestampToDate = (timestamp) => {
    if (!timestamp || timestamp.trim() === '')
        return '';
    const parsedTimestamp = parseInt(timestamp, 10);
    if (!isNaN(parsedTimestamp)) {
        const date = new Date(parsedTimestamp * 1000);
        if (isNaN(date.getTime()))
            return '';
        return date.toISOString().split('T')[0];
    }
    const isoDate = new Date(timestamp);
    if (isNaN(isoDate.getTime()))
        return '';
    const isoDateParts = timestamp.split('-');
    const month = parseInt(isoDateParts[1], 10);
    if (month > 12 || month < 1) {
        return '';
    }
    return isoDate.toISOString().split('T')[0];
};
export const validateUrl = (url) => {
    const urlPattern = /^(https?|ftp):\/\/(([A-Z0-9]([A-Z0-9_-]*[A-Z0-9]|))(\.[A-Z0-9]([A-Z0-9_-]*[A-Z0-9]|))*)(:(\d+))?(\/[A-Z0-9~](([A-Z0-9_~-]|\.)*[A-Z0-9~]|))*\/?(.*)?$/i;
    return urlPattern.test(url);
};
export const validateLength = (value, minLength, maxLength) => {
    const length = value.length;
    return length >= minLength && length <= maxLength;
};
export const validationFields = (value, configs, translations, errorsList) => {
    const { requiredFieldError, lengthTextError, numericError, alphaNumWithSpacesError, alphaNumericError, alphaError, emailError, dateError, urlError, dateLengthError, dateMaxError, dateMinError, } = translations;
    const fieldName = configs?.customUpperCode;
    const defaultFields = { [fieldName]: '' };
    if (errorsList[fieldName]) {
        delete errorsList[fieldName];
    }
    if (configs?.required && !value) {
        return { [fieldName]: requiredFieldError };
    }
    if (!configs?.required && !value) {
        return defaultFields;
    }
    if (!configs?.validateRules?.length)
        return defaultFields;
    const validateRulesConfig = flattenObjectsArray(configs?.validateRules);
    const min = validateRulesConfig[ConfigEnumLength.MIN_TEXT_LENGTH] ?? 1;
    const max = validateRulesConfig[ConfigEnumLength.MAX_TEXT_LENGTH] ?? 255;
    const dateMin = validateRulesConfig[ConfigEnumLength.DATE_RANGE_MIN];
    const dateMax = validateRulesConfig[ConfigEnumLength.DATE_RANGE_MAX];
    if (!validateLength(value, +min, +max) && !(dateMin || dateMax)) {
        return {
            [fieldName]: lengthTextError.replace('{min}', min).replace('{max}', max),
        };
    }
    if (!isDateWithinRange(value, +dateMin, +dateMax) && (dateMin || dateMax)) {
        if (typeof dateMin === 'undefined' || typeof dateMax === 'undefined') {
            return {
                [fieldName]: dateMax
                    ? dateMaxError.replace('{max}', convertTimestampToDate(dateMax))
                    : dateMinError.replace('{min}', convertTimestampToDate(dateMin)),
            };
        }
        if (dateMin && dateMin) {
            return {
                [fieldName]: dateLengthError
                    .replace('{min}', convertTimestampToDate(dateMin))
                    .replace('{max}', convertTimestampToDate(dateMax)),
            };
        }
    }
    const validationMap = {
        [InputValidation.Numeric]: {
            validate: validateNumeric,
            error: numericError,
        },
        [InputValidation.AlphanumWithSpaces]: {
            validate: validateAlphanumWithSpaces,
            error: alphaNumWithSpacesError,
        },
        [InputValidation.Alphanumeric]: {
            validate: validateAlphanumeric,
            error: alphaNumericError,
        },
        [InputValidation.Alpha]: {
            validate: validateAlpha,
            error: alphaError,
        },
        [InputValidation.Email]: {
            validate: validateEmail,
            error: emailError,
        },
        [InputValidation.Date]: {
            validate: validateDate,
            error: dateError,
        },
        [InputValidation.Url]: {
            validate: validateUrl,
            error: urlError,
        },
    };
    const validation = validationMap[validateRulesConfig['INPUT_VALIDATION']];
    if (validation &&
        !validation.validate(value) &&
        !errorsList[fieldName]?.length) {
        return { [fieldName]: validation.error };
    }
    return defaultFields;
};
