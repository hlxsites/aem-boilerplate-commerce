import{f as r,h as a}from"./resetCart.js";import"@dropins/tools/event-bus.js";function s(t){if(!t)return null;const i=_=>{switch(_){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}};return{displayMiniCart:t.minicart_display,miniCartMaxItemsDisplay:t.minicart_max_items,cartExpiresInDays:t.cart_expires_in_days,cartSummaryDisplayTotal:t.cart_summary_display_quantity,defaultCountry:t.default_country,categoryFixedProductTaxDisplaySetting:t.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:t.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:t.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:t.shopping_cart_display_zero_tax,subtotal:i(t.shopping_cart_display_subtotal),price:i(t.shopping_cart_display_price),shipping:i(t.shopping_cart_display_shipping),fullSummary:t.shopping_cart_display_full_summary,grandTotal:t.shopping_cart_display_grand_total,taxGiftWrapping:t.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:t.configurable_thumbnail_source==="parent"}}const p=`
query STORE_CONFIG_QUERY {
  storeConfig {
    minicart_display 
    minicart_max_items
    cart_expires_in_days 
    cart_summary_display_quantity
    default_country
    category_fixed_product_tax_display_setting
    product_fixed_product_tax_display_setting
    sales_fixed_product_tax_display_setting
    shopping_cart_display_full_summary
    shopping_cart_display_grand_total
    shopping_cart_display_price
    shopping_cart_display_shipping
    shopping_cart_display_subtotal
    shopping_cart_display_tax_gift_wrapping
    shopping_cart_display_zero_tax
    configurable_thumbnail_source
  }
}
`,o=async()=>r(p,{method:"GET",cache:"force-cache"}).then(({errors:t,data:i})=>t?a(t):s(i.storeConfig));export{o as g};
//# sourceMappingURL=getStoreConfig.js.map
