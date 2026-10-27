import { CustomizableOptionsAttributeValue, RawCustomizableOptionsAttributeValue } from '../models';

/**
 * Coerces the numeric-string `price` fields delivered by Catalog Service
 * (e.g. "108.000000") into numbers, leaving every other field untouched.
 */
export declare function parseCustomizableOptionsAttribute(raw: RawCustomizableOptionsAttributeValue): CustomizableOptionsAttributeValue;
//# sourceMappingURL=customizable-options-transform.d.ts.map