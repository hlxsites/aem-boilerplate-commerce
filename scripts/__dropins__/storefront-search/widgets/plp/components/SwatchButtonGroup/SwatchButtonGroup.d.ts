import { FunctionComponent } from 'preact';
import { SwatchValues } from '../../types/interface';

export interface SwatchButtonGroupProps {
    isSelected: (id: string) => boolean | undefined;
    swatches: SwatchValues[];
    showMore: () => any;
    productUrl: string;
    onClick: (optionIds: string[], sku: string) => any;
    sku: string;
}
export declare const SwatchButtonGroup: FunctionComponent<SwatchButtonGroupProps>;
//# sourceMappingURL=SwatchButtonGroup.d.ts.map