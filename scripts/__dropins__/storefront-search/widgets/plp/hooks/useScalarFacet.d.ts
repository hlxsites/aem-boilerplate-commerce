import { Facet as FacetType, PriceFacet } from '../types';

export declare const useScalarFacet: (facet: FacetType | PriceFacet) => {
    isSelected: (attribute: string) => boolean | undefined;
    onChange: (value: string, selected?: boolean) => void;
};
export default useScalarFacet;
//# sourceMappingURL=useScalarFacet.d.ts.map