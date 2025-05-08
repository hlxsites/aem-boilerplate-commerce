export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    DateTime: {
        input: any;
        output: any;
    };
    JSON: {
        input: any;
        output: any;
    };
};
/** A bucket that contains information for each filterable option */
export type Aggregation = {
    __typename?: "Aggregation";
    /** The attribute code of the filter item */
    attribute: Scalars["String"]["output"];
    /** A container that divides the data into manageable groups. For example, attributes that can have numeric values might have buckets that define price ranges */
    buckets: Array<Maybe<Bucket>>;
    /** The filter name displayed in layered navigation */
    title: Scalars["String"]["output"];
    /** Identifies the data type of the aggregation */
    type?: Maybe<AggregationType>;
};
/** Identifies the data type of the aggregation */
export declare enum AggregationType {
    Intelligent = "INTELLIGENT",
    Pinned = "PINNED",
    Popular = "POPULAR"
}
/** The rule that was applied to this product */
export type AppliedQueryRule = {
    __typename?: "AppliedQueryRule";
    /** An enum that defines the type of rule that was applied */
    action_type?: Maybe<AppliedQueryRuleActionType>;
    /** The ID assigned to the rule */
    rule_id?: Maybe<Scalars["String"]["output"]>;
    /** The name of the applied rule */
    rule_name?: Maybe<Scalars["String"]["output"]>;
};
/** The type of rule that was applied to a product during search (optional) */
export declare enum AppliedQueryRuleActionType {
    Boost = "BOOST",
    Bury = "BURY",
    Pin = "PIN"
}
/** Contains the output of the `attributeMetadata` query */
export type AttributeMetadataResponse = {
    __typename?: "AttributeMetadataResponse";
    /** An array of product attributes that can be used for filtering in a `productSearch` query */
    filterableInSearch?: Maybe<Array<FilterableInSearchAttribute>>;
    /** An array of product attributes that can be used for sorting in a `productSearch` query */
    sortable?: Maybe<Array<SortableAttribute>>;
};
/** An interface for bucket contents */
export type Bucket = {
    /** A human-readable name of a bucket */
    title: Scalars["String"]["output"];
};
/** Defines features of a bundle product */
export type BundleProduct = PhysicalProductInterface & ProductInterface & {
    __typename?: "BundleProduct";
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** Relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    /** An array of custom product attributes */
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
    /** The weight of the item, in units defined by the store */
    weight?: Maybe<Scalars["Float"]["output"]>;
};
/** Category view bucket for federation */
export type CategoryView = Bucket & CategoryViewInterface & {
    __typename?: "CategoryView";
    availableSortBy?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    children?: Maybe<Array<Scalars["String"]["output"]>>;
    count: Scalars["Int"]["output"];
    defaultSortBy?: Maybe<Scalars["String"]["output"]>;
    id: Scalars["ID"]["output"];
    level?: Maybe<Scalars["Int"]["output"]>;
    name?: Maybe<Scalars["String"]["output"]>;
    parentId: Scalars["String"]["output"];
    path?: Maybe<Scalars["String"]["output"]>;
    roles: Array<Scalars["String"]["output"]>;
    title: Scalars["String"]["output"];
    urlKey?: Maybe<Scalars["String"]["output"]>;
    urlPath?: Maybe<Scalars["String"]["output"]>;
};
export type CategoryViewInterface = {
    availableSortBy?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    defaultSortBy?: Maybe<Scalars["String"]["output"]>;
    id: Scalars["ID"]["output"];
    level?: Maybe<Scalars["Int"]["output"]>;
    name?: Maybe<Scalars["String"]["output"]>;
    path?: Maybe<Scalars["String"]["output"]>;
    roles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    urlKey?: Maybe<Scalars["String"]["output"]>;
    urlPath?: Maybe<Scalars["String"]["output"]>;
};
/** Represents all product types, except simple products. Complex product prices are returned as a price range, because price values can vary based on selected options. */
export type ComplexProductView = ProductView & {
    __typename?: "ComplexProductView";
    /** A flag stating if the product can be added to cart */
    addToCartAllowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** A list of merchant-defined attributes designated for the storefront. */
    attributes?: Maybe<Array<Maybe<ProductViewAttribute>>>;
    /**
     * List of categories to which the product belongs
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    categories?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    /** The detailed description of the product. */
    description?: Maybe<Scalars["String"]["output"]>;
    /** External Id */
    externalId?: Maybe<Scalars["String"]["output"]>;
    /** The product ID, generated as a composite key, unique per locale. */
    id: Scalars["ID"]["output"];
    /** A list of images defined for the product. */
    images?: Maybe<Array<Maybe<ProductViewImage>>>;
    /** A flag stating if the product is in stock */
    inStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** A list of input options. */
    inputOptions?: Maybe<Array<Maybe<ProductViewInputOption>>>;
    /** Date and time when the product was last updated. */
    lastModifiedAt?: Maybe<Scalars["DateTime"]["output"]>;
    /** A list of product links */
    links?: Maybe<Array<Maybe<ProductViewLink>>>;
    /** A flag stating if the product stock is low */
    lowStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** A brief overview of the product for search results listings. */
    metaDescription?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    metaKeyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    metaTitle?: Maybe<Scalars["String"]["output"]>;
    /** Product name. */
    name?: Maybe<Scalars["String"]["output"]>;
    /** A list of selectable options. */
    options?: Maybe<Array<Maybe<ProductViewOption>>>;
    /** A range of possible prices for a complex product. */
    priceRange?: Maybe<ProductViewPriceRange>;
    /** Indicates if the product was retrieved from the primary or the backup query */
    queryType?: Maybe<Scalars["String"]["output"]>;
    /**
     * Rank given to a product
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    rank?: Maybe<Scalars["Int"]["output"]>;
    /**
     * Score indicating relevance of the product to the recommendation type
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    score?: Maybe<Scalars["Float"]["output"]>;
    /** A summary of the product. */
    shortDescription?: Maybe<Scalars["String"]["output"]>;
    /** Product SKU. */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** Canonical URL of the product. */
    url?: Maybe<Scalars["String"]["output"]>;
    /** The URL key of the product. */
    urlKey?: Maybe<Scalars["String"]["output"]>;
    /** A list of videos defined for the product. */
    videos?: Maybe<Array<Maybe<ProductViewVideo>>>;
    /** Visibility setting of the product */
    visibility?: Maybe<Scalars["String"]["output"]>;
};
/** Represents all product types, except simple products. Complex product prices are returned as a price range, because price values can vary based on selected options. */
export type ComplexProductViewAttributesArgs = {
    roles?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};
/** Represents all product types, except simple products. Complex product prices are returned as a price range, because price values can vary based on selected options. */
export type ComplexProductViewImagesArgs = {
    roles?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};
/** Represents all product types, except simple products. Complex product prices are returned as a price range, because price values can vary based on selected options. */
export type ComplexProductViewLinksArgs = {
    linkTypes?: InputMaybe<Array<Scalars["String"]["input"]>>;
};
/** Text that can contain HTML tags */
export type ComplexTextValue = {
    __typename?: "ComplexTextValue";
    /** Text that can contain HTML tags */
    html: Scalars["String"]["output"];
};
/** Basic features of a configurable product and its simple product variants */
export type ConfigurableProduct = PhysicalProductInterface & ProductInterface & {
    __typename?: "ConfigurableProduct";
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** A relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    /** An array of custom product attributes */
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
    /** The weight of the item, in units defined by the store */
    weight?: Maybe<Scalars["Float"]["output"]>;
};
export declare enum CurrencyEnum {
    Aed = "AED",
    Afn = "AFN",
    All = "ALL",
    Amd = "AMD",
    Ang = "ANG",
    Aoa = "AOA",
    Ars = "ARS",
    Aud = "AUD",
    Awg = "AWG",
    Azm = "AZM",
    Azn = "AZN",
    Bam = "BAM",
    Bbd = "BBD",
    Bdt = "BDT",
    Bgn = "BGN",
    Bhd = "BHD",
    Bif = "BIF",
    Bmd = "BMD",
    Bnd = "BND",
    Bob = "BOB",
    Brl = "BRL",
    Bsd = "BSD",
    Btn = "BTN",
    Buk = "BUK",
    Bwp = "BWP",
    Byn = "BYN",
    Bzd = "BZD",
    Cad = "CAD",
    Cdf = "CDF",
    Che = "CHE",
    Chf = "CHF",
    Chw = "CHW",
    Clp = "CLP",
    Cny = "CNY",
    Cop = "COP",
    Crc = "CRC",
    Cup = "CUP",
    Cve = "CVE",
    Czk = "CZK",
    Djf = "DJF",
    Dkk = "DKK",
    Dop = "DOP",
    Dzd = "DZD",
    Eek = "EEK",
    Egp = "EGP",
    Ern = "ERN",
    Etb = "ETB",
    Eur = "EUR",
    Fjd = "FJD",
    Fkp = "FKP",
    Gbp = "GBP",
    Gek = "GEK",
    Gel = "GEL",
    Ghs = "GHS",
    Gip = "GIP",
    Gmd = "GMD",
    Gnf = "GNF",
    Gqe = "GQE",
    Gtq = "GTQ",
    Gyd = "GYD",
    Hkd = "HKD",
    Hnl = "HNL",
    Hrk = "HRK",
    Htg = "HTG",
    Huf = "HUF",
    Idr = "IDR",
    Ils = "ILS",
    Inr = "INR",
    Iqd = "IQD",
    Irr = "IRR",
    Isk = "ISK",
    Jmd = "JMD",
    Jod = "JOD",
    Jpy = "JPY",
    Kes = "KES",
    Kgs = "KGS",
    Khr = "KHR",
    Kmf = "KMF",
    Kpw = "KPW",
    Krw = "KRW",
    Kwd = "KWD",
    Kyd = "KYD",
    Kzt = "KZT",
    Lak = "LAK",
    Lbp = "LBP",
    Lkr = "LKR",
    Lrd = "LRD",
    Lsl = "LSL",
    Lsm = "LSM",
    Ltl = "LTL",
    Lvl = "LVL",
    Lyd = "LYD",
    Mad = "MAD",
    Mdl = "MDL",
    Mga = "MGA",
    Mkd = "MKD",
    Mmk = "MMK",
    Mnt = "MNT",
    Mop = "MOP",
    Mro = "MRO",
    Mur = "MUR",
    Mvr = "MVR",
    Mwk = "MWK",
    Mxn = "MXN",
    Myr = "MYR",
    Mzn = "MZN",
    Nad = "NAD",
    Ngn = "NGN",
    Nic = "NIC",
    Nok = "NOK",
    Npr = "NPR",
    Nzd = "NZD",
    Omr = "OMR",
    Pab = "PAB",
    Pen = "PEN",
    Pgk = "PGK",
    Php = "PHP",
    Pkr = "PKR",
    Pln = "PLN",
    Pyg = "PYG",
    Qar = "QAR",
    Rhd = "RHD",
    Rol = "ROL",
    Ron = "RON",
    Rsd = "RSD",
    Rub = "RUB",
    Rwf = "RWF",
    Sar = "SAR",
    Sbd = "SBD",
    Scr = "SCR",
    Sdg = "SDG",
    Sek = "SEK",
    Sgd = "SGD",
    Shp = "SHP",
    Skk = "SKK",
    Sll = "SLL",
    Sos = "SOS",
    Srd = "SRD",
    Std = "STD",
    Svc = "SVC",
    Syp = "SYP",
    Szl = "SZL",
    Thb = "THB",
    Tjs = "TJS",
    Tmm = "TMM",
    Tnd = "TND",
    Top = "TOP",
    Trl = "TRL",
    Try = "TRY",
    Ttd = "TTD",
    Twd = "TWD",
    Tzs = "TZS",
    Uah = "UAH",
    Ugx = "UGX",
    Usd = "USD",
    Uyu = "UYU",
    Uzs = "UZS",
    Veb = "VEB",
    Vef = "VEF",
    Vnd = "VND",
    Vuv = "VUV",
    Wst = "WST",
    Xcd = "XCD",
    Xof = "XOF",
    Xpf = "XPF",
    Yer = "YER",
    Zar = "ZAR",
    Zmk = "ZMK",
    Zwd = "ZWD"
}
/** A product attribute defined by the merchant */
export type CustomAttribute = {
    __typename?: "CustomAttribute";
    /** The unique identifier for an attribute code */
    code: Scalars["String"]["output"];
    /** The value assigned to the custom attribute */
    value: Scalars["String"]["output"];
};
/** A product that the shopper downloads */
export type DownloadableProduct = ProductInterface & {
    __typename?: "DownloadableProduct";
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** A relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    /** An array of custom product attributes */
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available. */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects. */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
};
/** Contains product attributes that can be used for filtering in a `productSearch` query */
export type FilterableInSearchAttribute = {
    __typename?: "FilterableInSearchAttribute";
    /** The unique identifier for an attribute code. This value should be in lowercase letters and without spaces */
    attribute: Scalars["String"]["output"];
    /** Indicates how field rendered on storefront */
    frontendInput?: Maybe<Scalars["String"]["output"]>;
    /** The display name assigned to the attribute */
    label?: Maybe<Scalars["String"]["output"]>;
    /** Indicates whether this attribute has a numeric value, such as a price or integer */
    numeric?: Maybe<Scalars["Boolean"]["output"]>;
};
/** A single FPT that can be applied to a product price */
export type FixedProductTax = {
    __typename?: "FixedProductTax";
    /** Amount of the FPT as a money object */
    amount?: Maybe<Money>;
    /** The label assigned to the FPT to be displayed on the frontend */
    label?: Maybe<Scalars["String"]["output"]>;
};
/** Defines properties of a gift card, including the minimum and maximum values and an array that contains the current and past values on the specific gift card */
export type GiftCardProduct = PhysicalProductInterface & ProductInterface & {
    __typename?: "GiftCardProduct";
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** Relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    /** An array of custom product attributes */
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
    /** The weight of the item, in units defined by the store */
    weight?: Maybe<Scalars["Float"]["output"]>;
};
/** Consists of simple standalone products that are presented as a group */
export type GroupedProduct = PhysicalProductInterface & ProductInterface & {
    __typename?: "GroupedProduct";
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** Relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    /** An array of custom product attributes */
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
    /** The weight of the item, in units defined by the store */
    weight?: Maybe<Scalars["Float"]["output"]>;
};
/** An object that provides highlighted text for matched words */
export type Highlight = {
    __typename?: "Highlight";
    /** The product attribute that contains a match for the search phrase */
    attribute: Scalars["String"]["output"];
    /** An array of strings */
    matched_words: Array<Maybe<Scalars["String"]["output"]>>;
    /** The matched text, enclosed within emphasis tags */
    value: Scalars["String"]["output"];
};
/** Contains basic information about a product image or video */
export type MediaGalleryInterface = {
    /** Whether the image is hidden from PDP gallery */
    disabled?: Maybe<Scalars["Boolean"]["output"]>;
    /** The label of the product image or video */
    label?: Maybe<Scalars["String"]["output"]>;
    /** The media item's position after it has been sorted */
    position?: Maybe<Scalars["Int"]["output"]>;
    /** The URL of the product image or video */
    url?: Maybe<Scalars["String"]["output"]>;
};
/** A monetary value, including a numeric value and a currency code */
export type Money = {
    __typename?: "Money";
    /** A three-letter currency code, such as USD or EUR */
    currency?: Maybe<CurrencyEnum>;
    /** A number expressing a monetary value */
    value?: Maybe<Scalars["Float"]["output"]>;
};
/** Type of page on which recommendations are requested */
export declare enum PageType {
    Cms = "CMS",
    Cart = "Cart",
    Category = "Category",
    Checkout = "Checkout",
    PageBuilder = "PageBuilder",
    Product = "Product"
}
/** Contains attributes specific to tangible products */
export type PhysicalProductInterface = {
    /** The weight of the item, in units defined by the store */
    weight?: Maybe<Scalars["Float"]["output"]>;
};
/** Defines the price of a simple product or a part of a price range for a complex product. It can include a list of price adjustments. */
export type Price = {
    __typename?: "Price";
    /** A list of price adjustments. */
    adjustments?: Maybe<Array<Maybe<PriceAdjustment>>>;
    /** Contains the monetary value and currency code of a product. */
    amount?: Maybe<ProductViewMoney>;
};
/** Specifies the amount and type of price adjustment. */
export type PriceAdjustment = {
    __typename?: "PriceAdjustment";
    /** The amount of the price adjustment. */
    amount?: Maybe<Scalars["Float"]["output"]>;
    /** Identifies the type of price adjustment. */
    code?: Maybe<Scalars["String"]["output"]>;
};
/** Price range for a product. If the product has a single price, the minimum and maximum price will be the same */
export type PriceRange = {
    __typename?: "PriceRange";
    /** The highest possible price for the product */
    maximum_price?: Maybe<ProductPrice>;
    /** The lowest possible price for the product */
    minimum_price: ProductPrice;
};
/** A discount applied to a product price */
export type ProductDiscount = {
    __typename?: "ProductDiscount";
    /** The actual value of the discount */
    amount_off?: Maybe<Scalars["Float"]["output"]>;
    /** The discount expressed a percentage */
    percent_off?: Maybe<Scalars["Float"]["output"]>;
};
/** Product image information. Contains the image URL and label */
export type ProductImage = MediaGalleryInterface & {
    __typename?: "ProductImage";
    /** Whether the image is hidden from PDP gallery */
    disabled?: Maybe<Scalars["Boolean"]["output"]>;
    /** The label of the product image or video */
    label?: Maybe<Scalars["String"]["output"]>;
    /** The media item's position after it has been sorted */
    position?: Maybe<Scalars["Int"]["output"]>;
    /** The URL of the product image or video */
    url?: Maybe<Scalars["String"]["output"]>;
};
/** Contains attributes that are common to all types of products */
export type ProductInterface = {
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** A relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    /** An array of custom product attributes */
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
};
/** Product price */
export type ProductPrice = {
    __typename?: "ProductPrice";
    /** The price discount. Represents the difference between the regular and final price */
    discount?: Maybe<ProductDiscount>;
    /** The final price of the product after discounts applied */
    final_price: Money;
    /** The multiple FPTs that can be applied to a product price */
    fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>;
    /** The regular price of the product */
    regular_price: Money;
};
/** A single product returned by the query */
export type ProductSearchItem = {
    __typename?: "ProductSearchItem";
    /** The query rule type that was applied to this product, if any (in preview mode only, returns null otherwise) */
    applied_query_rule?: Maybe<AppliedQueryRule>;
    /** An object that provides highlighted text for matched words */
    highlights?: Maybe<Array<Maybe<Highlight>>>;
    /** Contains details about the product */
    product: ProductInterface;
    /** Contains a product view */
    productView?: Maybe<ProductView>;
};
/** Contains the output of a `productSearch` query */
export type ProductSearchResponse = {
    __typename?: "ProductSearchResponse";
    /** Details about the static and dynamic facets relevant to the search */
    facets?: Maybe<Array<Maybe<Aggregation>>>;
    /** An array of products returned by the query */
    items?: Maybe<Array<Maybe<ProductSearchItem>>>;
    /** Information for rendering pages of search results */
    page_info?: Maybe<SearchResultPageInfo>;
    /** An array of strings that might include merchant-defined synonyms */
    related_terms?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    /** An array of strings that include the names of products and categories that exist in the catalog that are similar to the search query */
    suggestions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    /** The total number of products returned that matched the query */
    total_count?: Maybe<Scalars["Int"]["output"]>;
};
/** The product attribute to sort on */
export type ProductSearchSortInput = {
    /** The attribute code of a product attribute */
    attribute: Scalars["String"]["input"];
    /** ASC (ascending) or DESC (descending) */
    direction: SortEnum;
};
/** Defines the product fields available to the SimpleProductView and ComplexProductView types. */
export type ProductView = {
    /** A flag stating if the product can be added to cart */
    addToCartAllowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** A list of merchant-defined attributes designated for the storefront. */
    attributes?: Maybe<Array<Maybe<ProductViewAttribute>>>;
    /**
     * List of categories to which the product belongs
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    categories?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    /** The detailed description of the product. */
    description?: Maybe<Scalars["String"]["output"]>;
    /** External Id */
    externalId?: Maybe<Scalars["String"]["output"]>;
    /** The product ID, generated as a composite key, unique per locale. */
    id: Scalars["ID"]["output"];
    /** A list of images defined for the product. */
    images?: Maybe<Array<Maybe<ProductViewImage>>>;
    /** A flag stating if the product is in stock */
    inStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** A list of input options. */
    inputOptions?: Maybe<Array<Maybe<ProductViewInputOption>>>;
    /** Date and time when the product was last updated. */
    lastModifiedAt?: Maybe<Scalars["DateTime"]["output"]>;
    /** A list of product links. */
    links?: Maybe<Array<Maybe<ProductViewLink>>>;
    /** A flag stating if the product stock is low */
    lowStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** A brief overview of the product for search results listings. */
    metaDescription?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    metaKeyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    metaTitle?: Maybe<Scalars["String"]["output"]>;
    /** Product name. */
    name?: Maybe<Scalars["String"]["output"]>;
    /** Indicates if the product was retrieved from the primary or the backup query */
    queryType?: Maybe<Scalars["String"]["output"]>;
    /**
     * Rank given to a product
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    rank?: Maybe<Scalars["Int"]["output"]>;
    /**
     * Score indicating relevance of the product to the recommendation type
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    score?: Maybe<Scalars["Float"]["output"]>;
    /** A summary of the product. */
    shortDescription?: Maybe<Scalars["String"]["output"]>;
    /** Product SKU. */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** Canonical URL of the product. */
    url?: Maybe<Scalars["String"]["output"]>;
    /** The URL key of the product. */
    urlKey?: Maybe<Scalars["String"]["output"]>;
    /** A list of videos defined for the product. */
    videos?: Maybe<Array<Maybe<ProductViewVideo>>>;
    /** Visibility setting of the product */
    visibility?: Maybe<Scalars["String"]["output"]>;
};
/** Defines the product fields available to the SimpleProductView and ComplexProductView types. */
export type ProductViewAttributesArgs = {
    roles?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};
/** Defines the product fields available to the SimpleProductView and ComplexProductView types. */
export type ProductViewImagesArgs = {
    roles?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};
/** Defines the product fields available to the SimpleProductView and ComplexProductView types. */
export type ProductViewLinksArgs = {
    linkTypes?: InputMaybe<Array<Scalars["String"]["input"]>>;
};
/** A container for customer-defined attributes that are displayed the storefront. */
export type ProductViewAttribute = {
    __typename?: "ProductViewAttribute";
    /** Label of the attribute. */
    label?: Maybe<Scalars["String"]["output"]>;
    /** Name of an attribute code. */
    name: Scalars["String"]["output"];
    /** Roles designated for an attribute on the storefront, such as "Show on PLP", "Show in PDP", or "Show in Search". */
    roles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    /** Attribute value, arbitrary of type. */
    value?: Maybe<Scalars["JSON"]["output"]>;
};
/** The list of supported currency codes. */
export declare enum ProductViewCurrency {
    Aed = "AED",
    Afn = "AFN",
    All = "ALL",
    Amd = "AMD",
    Ang = "ANG",
    Aoa = "AOA",
    Ars = "ARS",
    Aud = "AUD",
    Awg = "AWG",
    Azm = "AZM",
    Azn = "AZN",
    Bam = "BAM",
    Bbd = "BBD",
    Bdt = "BDT",
    Bgn = "BGN",
    Bhd = "BHD",
    Bif = "BIF",
    Bmd = "BMD",
    Bnd = "BND",
    Bob = "BOB",
    Brl = "BRL",
    Bsd = "BSD",
    Btn = "BTN",
    Buk = "BUK",
    Bwp = "BWP",
    Byn = "BYN",
    Bzd = "BZD",
    Cad = "CAD",
    Cdf = "CDF",
    Che = "CHE",
    Chf = "CHF",
    Chw = "CHW",
    Clp = "CLP",
    Cny = "CNY",
    Cop = "COP",
    Crc = "CRC",
    Cup = "CUP",
    Cve = "CVE",
    Czk = "CZK",
    Djf = "DJF",
    Dkk = "DKK",
    Dop = "DOP",
    Dzd = "DZD",
    Eek = "EEK",
    Egp = "EGP",
    Ern = "ERN",
    Etb = "ETB",
    Eur = "EUR",
    Fjd = "FJD",
    Fkp = "FKP",
    Gbp = "GBP",
    Gek = "GEK",
    Gel = "GEL",
    Ghs = "GHS",
    Gip = "GIP",
    Gmd = "GMD",
    Gnf = "GNF",
    Gqe = "GQE",
    Gtq = "GTQ",
    Gyd = "GYD",
    Hkd = "HKD",
    Hnl = "HNL",
    Hrk = "HRK",
    Htg = "HTG",
    Huf = "HUF",
    Idr = "IDR",
    Ils = "ILS",
    Inr = "INR",
    Iqd = "IQD",
    Irr = "IRR",
    Isk = "ISK",
    Jmd = "JMD",
    Jod = "JOD",
    Jpy = "JPY",
    Kes = "KES",
    Kgs = "KGS",
    Khr = "KHR",
    Kmf = "KMF",
    Kpw = "KPW",
    Krw = "KRW",
    Kwd = "KWD",
    Kyd = "KYD",
    Kzt = "KZT",
    Lak = "LAK",
    Lbp = "LBP",
    Lkr = "LKR",
    Lrd = "LRD",
    Lsl = "LSL",
    Lsm = "LSM",
    Ltl = "LTL",
    Lvl = "LVL",
    Lyd = "LYD",
    Mad = "MAD",
    Mdl = "MDL",
    Mga = "MGA",
    Mkd = "MKD",
    Mmk = "MMK",
    Mnt = "MNT",
    Mop = "MOP",
    Mro = "MRO",
    Mur = "MUR",
    Mvr = "MVR",
    Mwk = "MWK",
    Mxn = "MXN",
    Myr = "MYR",
    Mzn = "MZN",
    Nad = "NAD",
    Ngn = "NGN",
    Nic = "NIC",
    Nok = "NOK",
    None = "NONE",
    Npr = "NPR",
    Nzd = "NZD",
    Omr = "OMR",
    Pab = "PAB",
    Pen = "PEN",
    Pgk = "PGK",
    Php = "PHP",
    Pkr = "PKR",
    Pln = "PLN",
    Pyg = "PYG",
    Qar = "QAR",
    Rhd = "RHD",
    Rol = "ROL",
    Ron = "RON",
    Rsd = "RSD",
    Rub = "RUB",
    Rwf = "RWF",
    Sar = "SAR",
    Sbd = "SBD",
    Scr = "SCR",
    Sdg = "SDG",
    Sek = "SEK",
    Sgd = "SGD",
    Shp = "SHP",
    Skk = "SKK",
    Sll = "SLL",
    Sos = "SOS",
    Srd = "SRD",
    Std = "STD",
    Svc = "SVC",
    Syp = "SYP",
    Szl = "SZL",
    Thb = "THB",
    Tjs = "TJS",
    Tmm = "TMM",
    Tnd = "TND",
    Top = "TOP",
    Trl = "TRL",
    Try = "TRY",
    Ttd = "TTD",
    Twd = "TWD",
    Tzs = "TZS",
    Uah = "UAH",
    Ugx = "UGX",
    Usd = "USD",
    Uyu = "UYU",
    Uzs = "UZS",
    Veb = "VEB",
    Vef = "VEF",
    Vnd = "VND",
    Vuv = "VUV",
    Wst = "WST",
    Xcd = "XCD",
    Xof = "XOF",
    Xpf = "XPF",
    Yer = "YER",
    Zar = "ZAR",
    Zmk = "ZMK",
    Zwd = "ZWD"
}
/** Contains details about a product image. */
export type ProductViewImage = {
    __typename?: "ProductViewImage";
    /** The display label of the product image. */
    label?: Maybe<Scalars["String"]["output"]>;
    /** A list that describes how the image is used. Can be image, small_image, or thumbnail. */
    roles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    /** The URL to the product image. */
    url: Scalars["String"]["output"];
};
/** Product options provide a way to configure products by making selections of particular option values. Selecting one or many options will point to a simple product. */
export type ProductViewInputOption = {
    __typename?: "ProductViewInputOption";
    fileExtensions?: Maybe<Scalars["String"]["output"]>;
    /** The ID of an option value */
    id?: Maybe<Scalars["ID"]["output"]>;
    imageSize?: Maybe<ProductViewInputOptionImageSize>;
    /** Price markup or markdown */
    markupAmount?: Maybe<Scalars["Float"]["output"]>;
    range?: Maybe<ProductViewInputOptionRange>;
    /** Wether this option is required or not */
    required?: Maybe<Scalars["Boolean"]["output"]>;
    /** Sort order */
    sortOrder?: Maybe<Scalars["Int"]["output"]>;
    /** SKU suffix to add to the product */
    suffix?: Maybe<Scalars["String"]["output"]>;
    /** The display name of the option value */
    title?: Maybe<Scalars["String"]["output"]>;
    /** The type of data entry */
    type?: Maybe<Scalars["String"]["output"]>;
};
export type ProductViewInputOptionImageSize = {
    __typename?: "ProductViewInputOptionImageSize";
    height?: Maybe<Scalars["Int"]["output"]>;
    width?: Maybe<Scalars["Int"]["output"]>;
};
export type ProductViewInputOptionRange = {
    __typename?: "ProductViewInputOptionRange";
    from?: Maybe<Scalars["Float"]["output"]>;
    to?: Maybe<Scalars["Float"]["output"]>;
};
/** The product link type. */
export type ProductViewLink = {
    __typename?: "ProductViewLink";
    /** Stores the types of the links with this product. */
    linkTypes: Array<Scalars["String"]["output"]>;
    /** Contains the details of the product found in the link. */
    product: ProductView;
};
/** Defines a monetary value, including a numeric value and a currency code. */
export type ProductViewMoney = {
    __typename?: "ProductViewMoney";
    /** A three-letter currency code, such as USD or EUR. */
    currency?: Maybe<ProductViewCurrency>;
    /** A number expressing a monetary value. */
    value?: Maybe<Scalars["Float"]["output"]>;
};
/** Product options provide a way to configure products by making selections of particular option values. Selecting one or many options will point to a simple product. */
export type ProductViewOption = {
    __typename?: "ProductViewOption";
    /** The ID of the option. */
    id?: Maybe<Scalars["ID"]["output"]>;
    /** Indicates whether the option allows multiple choices. */
    multi?: Maybe<Scalars["Boolean"]["output"]>;
    /** Indicates whether the option must be selected. */
    required?: Maybe<Scalars["Boolean"]["output"]>;
    /** The display name of the option. */
    title?: Maybe<Scalars["String"]["output"]>;
    /** List of available option values. */
    values?: Maybe<Array<ProductViewOptionValue>>;
};
/** Defines the product fields available to the ProductViewOptionValueProduct and ProductViewOptionValueConfiguration types. */
export type ProductViewOptionValue = {
    /** The ID of an option value. */
    id?: Maybe<Scalars["ID"]["output"]>;
    /** Indicates if the option is in stock. */
    inStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** The display name of the option value. */
    title?: Maybe<Scalars["String"]["output"]>;
};
/** An implementation of ProductViewOptionValue for configuration values. */
export type ProductViewOptionValueConfiguration = ProductViewOptionValue & {
    __typename?: "ProductViewOptionValueConfiguration";
    /** The ID of an option value. */
    id?: Maybe<Scalars["ID"]["output"]>;
    /** Indicates if the option is in stock. */
    inStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** The display name of the option value. */
    title?: Maybe<Scalars["String"]["output"]>;
};
/** An implementation of ProductViewOptionValue that adds details about a simple product. */
export type ProductViewOptionValueProduct = ProductViewOptionValue & {
    __typename?: "ProductViewOptionValueProduct";
    /** The ID of an option value. */
    id?: Maybe<Scalars["ID"]["output"]>;
    /** Indicates if the option is in stock. */
    inStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** States if the option value is default or not. */
    isDefault?: Maybe<Scalars["Boolean"]["output"]>;
    /** Details about a simple product. */
    product?: Maybe<SimpleProductView>;
    /** Default quantity of an option value. */
    quantity?: Maybe<Scalars["Float"]["output"]>;
    /** The display name of the option value. */
    title?: Maybe<Scalars["String"]["output"]>;
};
/** An implementation of ProductViewOptionValueSwatch for swatches. */
export type ProductViewOptionValueSwatch = ProductViewOptionValue & {
    __typename?: "ProductViewOptionValueSwatch";
    /** The ID of an option value. */
    id?: Maybe<Scalars["ID"]["output"]>;
    /** Indicates if the option is in stock. */
    inStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** The display name of the option value. */
    title?: Maybe<Scalars["String"]["output"]>;
    /** Indicates the type of the swatch. */
    type?: Maybe<SwatchType>;
    /** The value of the swatch depending on the type of the swatch. */
    value?: Maybe<Scalars["String"]["output"]>;
};
/** Base product price view, inherent for simple products. */
export type ProductViewPrice = {
    __typename?: "ProductViewPrice";
    /** Price value after discounts, excluding personalized promotions. */
    final?: Maybe<Price>;
    /** Base product price specified by the merchant. */
    regular?: Maybe<Price>;
    /** Price roles, stating if the price should be visible or hidden. */
    roles?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};
/** The minimum and maximum price of a complex product. */
export type ProductViewPriceRange = {
    __typename?: "ProductViewPriceRange";
    /** Maximum price. */
    maximum?: Maybe<ProductViewPrice>;
    /** Minimum price. */
    minimum?: Maybe<ProductViewPrice>;
};
export type ProductViewVariant = {
    __typename?: "ProductViewVariant";
    /** Product corresponding to the variant. */
    product?: Maybe<ProductView>;
    /** List of option values that make up the variant. */
    selections?: Maybe<Array<Scalars["String"]["output"]>>;
};
export type ProductViewVariantResults = {
    __typename?: "ProductViewVariantResults";
    /** Pagination cursor */
    cursor?: Maybe<Scalars["String"]["output"]>;
    /** List of product variants. */
    variants: Array<Maybe<ProductViewVariant>>;
};
/** Contains details about a product video */
export type ProductViewVideo = {
    __typename?: "ProductViewVideo";
    /** Description of the product video. */
    description?: Maybe<Scalars["String"]["output"]>;
    /** Preview image for the video */
    preview?: Maybe<ProductViewImage>;
    /** The title of the product video. */
    title?: Maybe<Scalars["String"]["output"]>;
    /** The URL to the product video. */
    url: Scalars["String"]["output"];
};
/** User purchase history */
export type PurchaseHistory = {
    date?: InputMaybe<Scalars["DateTime"]["input"]>;
    items: Array<InputMaybe<Scalars["String"]["input"]>>;
};
export type Query = {
    __typename?: "Query";
    /** Return a list of product attribute codes that can be used for sorting or filtering in a `productSearch` query */
    attributeMetadata: AttributeMetadataResponse;
    categories?: Maybe<Array<Maybe<CategoryView>>>;
    /** Search products using Live Search */
    productSearch: ProductSearchResponse;
    /** Search for products that match the specified SKU values. */
    products?: Maybe<Array<Maybe<ProductView>>>;
    /** Get Recommendations */
    recommendations?: Maybe<Recommendations>;
    refineProduct?: Maybe<ProductView>;
    variants?: Maybe<ProductViewVariantResults>;
};
export type QueryCategoriesArgs = {
    ids?: InputMaybe<Array<Scalars["String"]["input"]>>;
    roles?: InputMaybe<Array<Scalars["String"]["input"]>>;
    subtree?: InputMaybe<Subtree>;
};
export type QueryProductSearchArgs = {
    context?: InputMaybe<QueryContextInput>;
    current_page?: InputMaybe<Scalars["Int"]["input"]>;
    filter?: InputMaybe<Array<SearchClauseInput>>;
    page_size?: InputMaybe<Scalars["Int"]["input"]>;
    phrase: Scalars["String"]["input"];
    sort?: InputMaybe<Array<ProductSearchSortInput>>;
};
export type QueryProductsArgs = {
    skus?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};
export type QueryRecommendationsArgs = {
    cartSkus?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    category?: InputMaybe<Scalars["String"]["input"]>;
    currentSku?: InputMaybe<Scalars["String"]["input"]>;
    pageType?: InputMaybe<PageType>;
    userPurchaseHistory?: InputMaybe<Array<InputMaybe<PurchaseHistory>>>;
    userViewHistory?: InputMaybe<Array<InputMaybe<ViewHistory>>>;
};
export type QueryRefineProductArgs = {
    optionIds: Array<Scalars["String"]["input"]>;
    sku: Scalars["String"]["input"];
};
export type QueryVariantsArgs = {
    cursor?: InputMaybe<Scalars["String"]["input"]>;
    optionIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
    pageSize?: InputMaybe<Scalars["Int"]["input"]>;
    sku: Scalars["String"]["input"];
};
export type QueryContextInput = {
    /**
     * The customer group code. Field reserved for future use.
     * Currently, passing this field will have no impact on search results, that is, the search
     * results will be for "Not logged in" customer
     */
    customerGroup: Scalars["String"]["input"];
    /** User view history with timestamp */
    userViewHistory?: InputMaybe<Array<ViewHistoryInput>>;
};
/** For use on numeric product fields */
export type RangeBucket = Bucket & {
    __typename?: "RangeBucket";
    /** The number of items in the bucket */
    count: Scalars["Int"]["output"];
    /** The minimum amount in a price range */
    from: Scalars["Float"]["output"];
    /** The display text defining the price range */
    title: Scalars["String"]["output"];
    /** The maximum amount in a price range */
    to?: Maybe<Scalars["Float"]["output"]>;
};
/** Recommendation Unit containing product and other details */
export type RecommendationUnit = {
    __typename?: "RecommendationUnit";
    /** Order in which recommendation units are displayed */
    displayOrder?: Maybe<Scalars["Int"]["output"]>;
    /** Page type */
    pageType?: Maybe<Scalars["String"]["output"]>;
    /** List of product view */
    productsView?: Maybe<Array<Maybe<ProductView>>>;
    /** Storefront label to be displayed on the storefront */
    storefrontLabel?: Maybe<Scalars["String"]["output"]>;
    /** Total products returned in recommedations */
    totalProducts?: Maybe<Scalars["Int"]["output"]>;
    /** Type of recommendation */
    typeId?: Maybe<Scalars["String"]["output"]>;
    /** Id of the preconfigured unit */
    unitId?: Maybe<Scalars["String"]["output"]>;
    /** Name of the preconfigured unit */
    unitName?: Maybe<Scalars["String"]["output"]>;
};
/** Recommendations response */
export type Recommendations = {
    __typename?: "Recommendations";
    /** List of rec units with products recommended */
    results?: Maybe<Array<Maybe<RecommendationUnit>>>;
    /** total number of rec units for which recommendations are returned */
    totalResults?: Maybe<Scalars["Int"]["output"]>;
};
/** For use on string and other scalar product fields */
export type ScalarBucket = Bucket & {
    __typename?: "ScalarBucket";
    /** The number of items in the bucket */
    count: Scalars["Int"]["output"];
    /** An identifier that can be used for filtering. It may contain non-human readable data */
    id: Scalars["ID"]["output"];
    /** The display text for the scalar value */
    title: Scalars["String"]["output"];
};
/** A product attribute to filter on */
export type SearchClauseInput = {
    /** The attribute code of a product attribute */
    attribute: Scalars["String"]["input"];
    /** Attribute value should contain the specified string */
    contains?: InputMaybe<Scalars["String"]["input"]>;
    /** A string value to filter on */
    eq?: InputMaybe<Scalars["String"]["input"]>;
    /** An array of string values to filter on */
    in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    /** A range of numeric values to filter on */
    range?: InputMaybe<SearchRangeInput>;
    /** Attribute value should start with the specified string */
    startsWith?: InputMaybe<Scalars["String"]["input"]>;
};
/** A range of numeric values for use in a search */
export type SearchRangeInput = {
    /** The minimum value to filter on. If not specified, the value of `0` is applied */
    from?: InputMaybe<Scalars["Float"]["input"]>;
    /** The maximum value to filter on */
    to?: InputMaybe<Scalars["Float"]["input"]>;
};
/** Provides navigation for the query response */
export type SearchResultPageInfo = {
    __typename?: "SearchResultPageInfo";
    /** Specifies which page of results to return */
    current_page?: Maybe<Scalars["Int"]["output"]>;
    /** Specifies the maximum number of items to return */
    page_size?: Maybe<Scalars["Int"]["output"]>;
    /** Specifies the total number of pages returned */
    total_pages?: Maybe<Scalars["Int"]["output"]>;
};
/** A simple product is tangible and is usually sold in single units or in fixed quantities */
export type SimpleProduct = PhysicalProductInterface & ProductInterface & {
    __typename?: "SimpleProduct";
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** A relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
    /** The weight of the item, in units defined by the store */
    weight?: Maybe<Scalars["Float"]["output"]>;
};
/** Represents simple products. Simple product prices do not contain price ranges. */
export type SimpleProductView = ProductView & {
    __typename?: "SimpleProductView";
    /** A flag stating if the product can be added to cart */
    addToCartAllowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** A list of merchant-defined attributes designated for the storefront. */
    attributes?: Maybe<Array<Maybe<ProductViewAttribute>>>;
    /**
     * List of categories to which the product belongs
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    categories?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    /** The detailed description of the product. */
    description?: Maybe<Scalars["String"]["output"]>;
    /** External Id */
    externalId?: Maybe<Scalars["String"]["output"]>;
    /** The product ID, generated as a composite key, unique per locale. */
    id: Scalars["ID"]["output"];
    /** A list of images defined for the product. */
    images?: Maybe<Array<Maybe<ProductViewImage>>>;
    /** A flag stating if the product is in stock */
    inStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** A list of input options. */
    inputOptions?: Maybe<Array<Maybe<ProductViewInputOption>>>;
    /** Date and time when the product was last updated. */
    lastModifiedAt?: Maybe<Scalars["DateTime"]["output"]>;
    /** A list of product links */
    links?: Maybe<Array<Maybe<ProductViewLink>>>;
    /** A flag stating if the product stock is low */
    lowStock?: Maybe<Scalars["Boolean"]["output"]>;
    /** A brief overview of the product for search results listings. */
    metaDescription?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines. */
    metaKeyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
    metaTitle?: Maybe<Scalars["String"]["output"]>;
    /** Product name. */
    name?: Maybe<Scalars["String"]["output"]>;
    /** Base product price view. */
    price?: Maybe<ProductViewPrice>;
    /** Indicates if the product was retrieved from the primary or the backup query */
    queryType?: Maybe<Scalars["String"]["output"]>;
    /**
     * Rank given to a product
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    rank?: Maybe<Scalars["Int"]["output"]>;
    /**
     * Score indicating relevance of the product to the recommendation type
     * @deprecated This field is deprecated and will be removed after Feb 1, 2024.
     */
    score?: Maybe<Scalars["Float"]["output"]>;
    /** A summary of the product. */
    shortDescription?: Maybe<Scalars["String"]["output"]>;
    /** Product SKU. */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** Canonical URL of the product. */
    url?: Maybe<Scalars["String"]["output"]>;
    /** The URL key of the product. */
    urlKey?: Maybe<Scalars["String"]["output"]>;
    /** A list of videos defined for the product. */
    videos?: Maybe<Array<Maybe<ProductViewVideo>>>;
    /** Visibility setting of the product */
    visibility?: Maybe<Scalars["String"]["output"]>;
};
/** Represents simple products. Simple product prices do not contain price ranges. */
export type SimpleProductViewAttributesArgs = {
    roles?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};
/** Represents simple products. Simple product prices do not contain price ranges. */
export type SimpleProductViewImagesArgs = {
    roles?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};
/** Represents simple products. Simple product prices do not contain price ranges. */
export type SimpleProductViewLinksArgs = {
    linkTypes?: InputMaybe<Array<Scalars["String"]["input"]>>;
};
/** This enumeration indicates whether to return results in ascending or descending order */
export declare enum SortEnum {
    Asc = "ASC",
    Desc = "DESC"
}
/** Contains product attributes that be used for sorting in a `productSearch` query */
export type SortableAttribute = {
    __typename?: "SortableAttribute";
    /** The unique identifier for an attribute code. This value should be in lowercase letters and without space */
    attribute: Scalars["String"]["output"];
    /** Indicates how field rendered on storefront */
    frontendInput?: Maybe<Scalars["String"]["output"]>;
    /** The display name assigned to the attribute */
    label?: Maybe<Scalars["String"]["output"]>;
    /** Indicates whether this attribute has a numeric value, such as a price or integer */
    numeric?: Maybe<Scalars["Boolean"]["output"]>;
};
/** For retrieving statistics across multiple buckets */
export type StatsBucket = Bucket & {
    __typename?: "StatsBucket";
    /** The maximum value */
    max: Scalars["Float"]["output"];
    /** The minimum value */
    min: Scalars["Float"]["output"];
    /** The display text for the bucket */
    title: Scalars["String"]["output"];
};
export type Subtree = {
    depth: Scalars["Int"]["input"];
    startLevel: Scalars["Int"]["input"];
};
export declare enum SwatchType {
    ColorHex = "COLOR_HEX",
    Custom = "CUSTOM",
    Image = "IMAGE",
    Text = "TEXT"
}
/** User view history */
export type ViewHistory = {
    date?: InputMaybe<Scalars["DateTime"]["input"]>;
    sku: Scalars["String"]["input"];
};
/** User view history */
export type ViewHistoryInput = {
    dateTime?: InputMaybe<Scalars["DateTime"]["input"]>;
    sku: Scalars["String"]["input"];
};
/** A non-tangible product that does not require shipping and is not kept in inventory */
export type VirtualProduct = ProductInterface & {
    __typename?: "VirtualProduct";
    /**
     * Boolean indicating whether a product can be added to cart. Field reserved for future use.
     * Currently, will default to true
     */
    add_to_cart_allowed?: Maybe<Scalars["Boolean"]["output"]>;
    /** The attribute set assigned to the product */
    attribute_set_id?: Maybe<Scalars["Int"]["output"]>;
    /** Relative canonical URL */
    canonical_url?: Maybe<Scalars["String"]["output"]>;
    /** Timestamp indicating when the product was created */
    created_at?: Maybe<Scalars["String"]["output"]>;
    /** An array of custom product attributes */
    custom_attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
    /** Detailed information about the product. The value can include simple HTML tags */
    description?: Maybe<ComplexTextValue>;
    /** Indicates whether a gift message is available */
    gift_message_available?: Maybe<Scalars["String"]["output"]>;
    /**
     * id
     * @deprecated Magento 2.4 has not yet deprecated the `ProductInterface.id` field
     */
    id?: Maybe<Scalars["Int"]["output"]>;
    /** The relative path to the main image on the product page */
    image?: Maybe<ProductImage>;
    /** An array of Media Gallery objects */
    media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
    /** A brief overview of the product for search results listings, maximum 255 characters */
    meta_description?: Maybe<Scalars["String"]["output"]>;
    /** A comma-separated list of keywords that are visible only to search engines */
    meta_keyword?: Maybe<Scalars["String"]["output"]>;
    /** A string that is displayed in the title bar and tab of the browser and in search results lists */
    meta_title?: Maybe<Scalars["String"]["output"]>;
    /** The product name. Customers use this name to identify the product */
    name?: Maybe<Scalars["String"]["output"]>;
    /** The beginning date for new product listings, and determines if the product is featured as a new product */
    new_from_date?: Maybe<Scalars["String"]["output"]>;
    /** The end date for new product listings */
    new_to_date?: Maybe<Scalars["String"]["output"]>;
    /** A PriceRange object, indicating the range of prices for the product */
    price_range: PriceRange;
    /** A short description of the product. Its use depends on the theme */
    short_description?: Maybe<ComplexTextValue>;
    /** A number or code assigned to a product to identify the product, options, price, and manufacturer */
    sku?: Maybe<Scalars["String"]["output"]>;
    /** The relative path to the small image, which is used on catalog pages */
    small_image?: Maybe<ProductImage>;
    /** The relative path to the product's thumbnail image */
    thumbnail?: Maybe<ProductImage>;
    /** The unique ID for a `ProductInterface` object */
    uid: Scalars["ID"]["output"];
    /** Timestamp indicating when the product was updated */
    updated_at?: Maybe<Scalars["String"]["output"]>;
};
export type ProductSearchQueryVariables = Exact<{
    phrase: Scalars["String"]["input"];
    size?: InputMaybe<Scalars["Int"]["input"]>;
    current?: InputMaybe<Scalars["Int"]["input"]>;
    filter?: InputMaybe<Array<SearchClauseInput> | SearchClauseInput>;
    sort?: InputMaybe<Array<ProductSearchSortInput> | ProductSearchSortInput>;
}>;
export type ProductSearchQuery = {
    __typename?: "Query";
    productSearch: {
        __typename?: "ProductSearchResponse";
        page_info?: {
            __typename?: "SearchResultPageInfo";
            current_page?: number | null;
            page_size?: number | null;
            total_pages?: number | null;
        } | null;
        items?: Array<{
            __typename?: "ProductSearchItem";
            product: {
                __typename?: "BundleProduct";
                uid: string;
                sku?: string | null;
                name?: string | null;
                canonical_url?: string | null;
                small_image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                thumbnail?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: "PriceRange";
                    minimum_price: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    };
                    maximum_price?: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    } | null;
                };
            } | {
                __typename?: "ConfigurableProduct";
                uid: string;
                sku?: string | null;
                name?: string | null;
                canonical_url?: string | null;
                small_image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                thumbnail?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: "PriceRange";
                    minimum_price: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    };
                    maximum_price?: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    } | null;
                };
            } | {
                __typename?: "DownloadableProduct";
                uid: string;
                sku?: string | null;
                name?: string | null;
                canonical_url?: string | null;
                small_image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                thumbnail?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: "PriceRange";
                    minimum_price: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    };
                    maximum_price?: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    } | null;
                };
            } | {
                __typename?: "GiftCardProduct";
                uid: string;
                sku?: string | null;
                name?: string | null;
                canonical_url?: string | null;
                small_image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                thumbnail?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: "PriceRange";
                    minimum_price: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    };
                    maximum_price?: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    } | null;
                };
            } | {
                __typename?: "GroupedProduct";
                uid: string;
                sku?: string | null;
                name?: string | null;
                canonical_url?: string | null;
                small_image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                thumbnail?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: "PriceRange";
                    minimum_price: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    };
                    maximum_price?: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    } | null;
                };
            } | {
                __typename?: "SimpleProduct";
                uid: string;
                sku?: string | null;
                name?: string | null;
                canonical_url?: string | null;
                small_image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                thumbnail?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: "PriceRange";
                    minimum_price: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    };
                    maximum_price?: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    } | null;
                };
            } | {
                __typename?: "VirtualProduct";
                uid: string;
                sku?: string | null;
                name?: string | null;
                canonical_url?: string | null;
                small_image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                image?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                thumbnail?: {
                    __typename?: "ProductImage";
                    url?: string | null;
                } | null;
                price_range: {
                    __typename?: "PriceRange";
                    minimum_price: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    };
                    maximum_price?: {
                        __typename?: "ProductPrice";
                        fixed_product_taxes?: Array<{
                            __typename?: "FixedProductTax";
                            label?: string | null;
                            amount?: {
                                __typename?: "Money";
                                value?: number | null;
                                currency?: CurrencyEnum | null;
                            } | null;
                        } | null> | null;
                        regular_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        final_price: {
                            __typename?: "Money";
                            value?: number | null;
                            currency?: CurrencyEnum | null;
                        };
                        discount?: {
                            __typename?: "ProductDiscount";
                            percent_off?: number | null;
                            amount_off?: number | null;
                        } | null;
                    } | null;
                };
            };
            productView?: {
                __typename?: "ComplexProductView";
                urlKey?: string | null;
            } | {
                __typename?: "SimpleProductView";
                urlKey?: string | null;
            } | null;
        } | null> | null;
    };
};
//# sourceMappingURL=types.d.ts.map