import { FunctionComponent } from 'preact/compat';

export type Language = {
    [key: string]: any;
};
export type Languages = {
    [key: string]: Language;
};
export declare const languages: Languages;
export declare const TranslationContext: import('preact').Context<Language>;
declare const useTranslation: () => Language;
declare const getCurrLanguage: (languageDetected: string) => string;
declare const Translation: FunctionComponent;
export default Translation;
export { getCurrLanguage, useTranslation };
//# sourceMappingURL=translation.d.ts.map