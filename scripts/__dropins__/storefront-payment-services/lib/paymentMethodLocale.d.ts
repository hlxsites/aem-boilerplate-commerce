import { Lang } from '@dropins/tools/types/elsie/src/i18n';

/**
 * Maps an elsie locale to the format that the Payment Services SDK expects for payment method
 * button locales: a formatted string consisting of an ISO-639-1 language code and an ISO-3166-1
 * region code, separated by a hyphen (-), e.g., "en-US".
 */
export declare function toPaymentMethodLocale(locale: Lang): string;
//# sourceMappingURL=paymentMethodLocale.d.ts.map