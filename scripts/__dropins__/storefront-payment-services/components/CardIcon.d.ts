import { IconProps } from '@dropins/tools/types/elsie/src/components';
import { CardBrand } from '../lib/creditCard';

export interface CardIconProps extends Omit<IconProps, "source" | "title" | "viewBox"> {
    /** Card brand. Falls back to the generic card icon when absent or unrecognized. */
    brand?: CardBrand;
}
export declare const CardIcon: ({ brand, ...restProps }: CardIconProps) => import("preact").JSX.Element;
//# sourceMappingURL=CardIcon.d.ts.map