export declare enum StockStatus {
    InStock = "IN_STOCK",
    OutOfStock = "OUT_OF_STOCK"
}
type Image = {
    src: string;
    alt?: string;
};
type Price = {
    value: number;
    currency: string;
};
export declare enum ItemKind {
    Simple = "SimpleProduct",
    Configurable = "ConfigurableProduct",
    Downloadable = "DownloadableProduct",
    GiftCard = "GiftCardProduct",
    Virtual = "VirtualProduct",
    Bundle = "BundleProduct"
}
type BaseItem = {
    url?: string | null;
    discount?: Price;
    discounted: boolean;
    image?: Image;
    kind: ItemKind;
    name: string;
    price: Price;
    priceInclTax: Price;
    quantity: number;
    regularPrice: Price;
    sku: string;
    total: Price;
    totalInclTax: Price;
    onlyXLeftInStock?: number | null;
    uid: string;
    stockStatus: StockStatus;
};
type Customizable = {
    customizableOptions: Record<string, string>;
};
type SimpleItem = Customizable;
type ConfigurableItem = Customizable & {
    configurableOptions: Record<string, string>;
};
type DownloadableItem = Customizable & {
    links: String[];
};
type GiftCardItem = Customizable & {
    senderName: string;
    senderEmail: string;
    recipientName: string;
    recipientEmail: string;
};
type VirtualItem = Customizable;
type BundleItem = BaseItem;
export type Item = BaseItem & (SimpleItem | ConfigurableItem | DownloadableItem | GiftCardItem | VirtualItem | BundleItem);
export {};
//# sourceMappingURL=cart-item.d.ts.map