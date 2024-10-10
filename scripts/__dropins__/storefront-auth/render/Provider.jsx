import { useState, useEffect } from 'preact/hooks';
import { UIProvider } from '@adobe/elsie/components';
import { events } from '@adobe/event-bus';
import { config } from '@/auth/api';
import { deepmerge } from '@adobe/elsie/lib';
import en_US from '../i18n/en_US.json';
// Langs
const langDefinitions = {
    default: en_US,
};
export const Provider = ({ children, }) => {
    const [locale, setLang] = useState('en_US');
    const userLangDefinitions = config?.getConfig()?.langDefinitions;
    //   Events
    useEffect(() => {
        const localeEvent = events.on('locale', (payload) => {
            if (payload !== locale)
                setLang(payload);
        }, { eager: true });
        return () => {
            localeEvent?.off();
        };
    }, [locale]);
    // Merge language definitions with user language definitions
    const definitions = deepmerge(langDefinitions, userLangDefinitions ?? {});
    return (<UIProvider lang={locale} langDefinitions={definitions}>
      {children}
    </UIProvider>);
};
