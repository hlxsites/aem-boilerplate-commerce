import { FunctionComponent } from 'preact';
import { Facet } from '../types/interface';

interface Props {
    facets: Facet[];
    totalCount: number;
    screenSize: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
        columns: number;
    };
}
export declare const ProductsHeader: FunctionComponent<Props>;
export {};
//# sourceMappingURL=ProductsHeader.d.ts.map