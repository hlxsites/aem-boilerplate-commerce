import { RecommendationUnitModel } from '../../data/models';

export interface CurrentProduct {
    sku?: string;
    price?: number;
}
export interface UnitSelector {
    unitIds?: string[];
    labels?: string[];
}
export interface GetRecommendationsByUnitsProps {
    currentSku?: string;
    cartSkus?: string[];
    userPurchaseHistory?: any[];
    userViewHistory?: any[];
    selector: UnitSelector;
    currentProduct?: CurrentProduct;
}
export declare const getRecommendationsByUnits: (params: GetRecommendationsByUnitsProps) => Promise<RecommendationUnitModel[] | null>;
//# sourceMappingURL=getRecommendationsByUnits.d.ts.map