import { FacetFilter } from '../../types/interface';

declare const formatRangeLabel: (filter: FacetFilter, currencyRate: string, currencySymbol: string) => string;
declare const formatBinaryLabel: (filter: FacetFilter, option: string, categoryNames?: {
    value: string;
    name: string;
    attribute: string;
}[], categoryPath?: string) => string;
export { formatBinaryLabel, formatRangeLabel };
//# sourceMappingURL=format.d.ts.map