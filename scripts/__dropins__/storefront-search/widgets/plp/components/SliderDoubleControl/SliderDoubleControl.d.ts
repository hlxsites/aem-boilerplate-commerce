import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { PriceFacet } from '../../types/interface';

export interface SliderProps extends HTMLAttributes<HTMLInputElement> {
    filterData: PriceFacet;
}
export type Bucket = {
    title: string;
    id?: string;
    count: number;
    to?: number;
    from?: number;
    name?: string;
    __typename: "ScalarBucket" | "RangeBucket" | "CategoryView";
};
export declare const SliderDoubleControl: FunctionComponent<SliderProps>;
//# sourceMappingURL=SliderDoubleControl.d.ts.map