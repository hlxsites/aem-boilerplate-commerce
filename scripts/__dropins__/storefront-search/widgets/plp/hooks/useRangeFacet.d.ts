import { PriceFacet } from '../types';

declare const useRangeFacet: ({ attribute, buckets }: PriceFacet) => {
    isSelected: (title: string) => boolean;
    onChange: (value: string) => void;
};
export default useRangeFacet;
//# sourceMappingURL=useRangeFacet.d.ts.map