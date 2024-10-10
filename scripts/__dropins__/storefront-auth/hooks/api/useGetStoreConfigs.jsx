import { getStoreConfig } from '@/auth/api';
import { useEffect, useState } from 'preact/hooks';
export const useGetStoreConfigs = () => {
    const [isEmailConfirmationRequired, setIsEmailConfirmationRequired] = useState(false);
    const [passwordConfigs, setPasswordConfigs] = useState(null);
    useEffect(() => {
        const storeConfigString = sessionStorage.getItem('storeConfig');
        const cachedStoreConfig = storeConfigString
            ? JSON.parse(storeConfigString)
            : null;
        if (cachedStoreConfig) {
            const { minLength, requiredCharacterClasses, createAccountConfirmation } = cachedStoreConfig;
            setPasswordConfigs({
                minLength,
                requiredCharacterClasses,
            });
            setIsEmailConfirmationRequired(createAccountConfirmation);
        }
        else {
            getStoreConfig().then((response) => {
                if (response) {
                    const { minLength, requiredCharacterClasses, createAccountConfirmation, } = response;
                    sessionStorage.setItem('storeConfig', JSON.stringify(response));
                    setPasswordConfigs({
                        minLength,
                        requiredCharacterClasses,
                    });
                    setIsEmailConfirmationRequired(createAccountConfirmation);
                }
            });
        }
    }, []);
    return { passwordConfigs, isEmailConfirmationRequired };
};
