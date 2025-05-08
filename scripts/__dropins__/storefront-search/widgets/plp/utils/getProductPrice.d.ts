import { Product, RefinedProduct } from '../types';

declare const getProductPrice: (product: Product | RefinedProduct, currencySymbol: string, currencyRate: string | undefined, useMaximum?: boolean, useFinal?: boolean) => string;
export { getProductPrice };
//# sourceMappingURL=getProductPrice.d.ts.map