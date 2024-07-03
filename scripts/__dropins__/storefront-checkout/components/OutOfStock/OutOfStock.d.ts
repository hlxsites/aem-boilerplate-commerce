import { FunctionComponent, JSX } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface OutOfStockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    icon?: FunctionComponent<JSX.SVGAttributes<SVGElement>>;
    routeCart?: () => string;
}
export declare const OutOfStock: FunctionComponent<OutOfStockProps>;
//# sourceMappingURL=OutOfStock.d.ts.map