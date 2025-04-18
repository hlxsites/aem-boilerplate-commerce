export interface WidgetConfigOptions {
    badge: Badge;
    price: Price;
    attributeSlot: AttributeSlot;
    addToWishlist: AddToWishlist;
    layout: Layout;
    addToCart: AddToCart;
    stockStatusFilterLook: StockStatusFilterLook;
    swatches: Swatches;
    multipleImages: MultipleImages;
    compare: Compare;
}
type Badge = {
    enabled: boolean;
    label: string;
    attributeCode: string;
    backgroundColor: string;
};
type Price = {
    showNoPrice: boolean;
    showRange: boolean;
    showRegularPrice: boolean;
    showStrikethruPrice: boolean;
};
type AttributeSlot = {
    enabled: boolean;
    attributeCode: string;
    backgroundColor: string;
};
type AddToWishlist = {
    enabled: boolean;
    placement: AddToWishlistPlacement;
};
export type AddToWishlistPlacement = "inLineWithName" | "onCard";
type Layout = {
    defaultLayout: LayoutType;
    allowedLayouts: LayoutType[];
    showToggle: boolean;
};
type LayoutType = "grid" | "list";
type AddToCart = {
    enabled: boolean;
};
type StockStatusFilterLook = "radio" | "checkbox" | "toggle";
type Swatches = {
    enabled: boolean;
    swatchAttributes: SwatchAttribute[];
    swatchesOnPage: number;
};
type SwatchAttribute = {
    attributeCode: string;
    swatchType: SwatchAttributeType;
};
type SwatchAttributeType = "color" | "size";
type MultipleImages = {
    enabled: boolean;
    limit: number;
};
type Compare = {
    enabled: boolean;
};
type SearchEvent = any;
declare module '@adobe/event-bus' {
    interface Events {
        'search/event': SearchEvent;
    }
}
export {};
//# sourceMappingURL=widget.d.ts.map