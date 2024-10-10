import { validationUniqueSymbolsPassword } from '@/auth/lib/validationUniqueSymbolsPassword';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useText } from '@adobe/elsie/i18n';
export const usePasswordValidationMessage = ({ passwordConfigs, isClickSubmit, password, }) => {
    const translations = useText({
        messageLengthPassword: 'Auth.PasswordValidationMessage.messageLengthPassword',
    });
    const [isValidUniqueSymbols, setIsValidUniqueSymbols] = useState('pending');
    useEffect(() => {
        if (!passwordConfigs)
            return;
        const result = validationUniqueSymbolsPassword(password, passwordConfigs.requiredCharacterClasses);
        if (isClickSubmit && password.length > 0) {
            result
                ? setIsValidUniqueSymbols('success')
                : setIsValidUniqueSymbols('error');
        }
        else if (isClickSubmit && password.length === 0) {
            setIsValidUniqueSymbols('pending');
        }
        else {
            result
                ? setIsValidUniqueSymbols('success')
                : setIsValidUniqueSymbols('pending');
        }
    }, [isClickSubmit, passwordConfigs, password]);
    const defaultLengthMessage = useMemo(() => {
        if (!passwordConfigs)
            return;
        const defaultMessage = {
            status: 'pending',
            icon: 'pending',
            message: translations.messageLengthPassword?.replace('{minLength}', `${passwordConfigs.minLength}`),
        };
        if (password.length && password.length >= passwordConfigs.minLength) {
            return { ...defaultMessage, icon: 'success', status: 'success' };
        }
        if (password.length && password.length < passwordConfigs.minLength) {
            return isClickSubmit
                ? { ...defaultMessage, icon: 'error', status: 'error' }
                : { ...defaultMessage, icon: 'pending', status: 'pending' };
        }
        return defaultMessage;
    }, [
        passwordConfigs,
        translations.messageLengthPassword,
        password?.length,
        isClickSubmit,
    ]);
    return { isValidUniqueSymbols, defaultLengthMessage };
};
