/*! Copyright 2025 Adobe
All Rights Reserved. */
import { classes } from "@dropins/tools/lib.js";
import { Price, Icon, Button, Image } from "@dropins/tools/components.js";
import { u } from "./jsxRuntime.module.js";
import { t } from "./devtools.module.js";
import { useState } from "@dropins/tools/preact-compat.js";
import { s as state, r as removeProductsFromWishlist } from "./removeProductsFromWishlist.js";
import { events } from "@dropins/tools/event-bus.js";
import { Fragment } from "@dropins/tools/preact.js";
import { a as SvgTrash, S as SvgCart } from "./Trash.js";
import { useText } from "@dropins/tools/i18n.js";
var _jsxFileName$3 = "/Users/ecornejo/Sites/storefront-wishlist/src/components/TaxDetails/TaxDetails.tsx";
const TaxDetails = ({
  taxes,
  displayMode
}) => u(Fragment, {
  children: taxes.map((tax, index) => u("div", {
    "data-testid": `wishlist-product-item-tax-${index}`,
    className: "wishlist-product-item-tax",
    children: [u("span", {
      className: "wishlist-product-item-tax-label",
      children: tax.label
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 38,
      columnNumber: 9
    }, void 0), u(Price, {
      className: "wishlist-product-item-tax-price",
      amount: tax.money.value,
      currency: tax.money.currency
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 39,
      columnNumber: 9
    }, void 0), u("span", {
      className: "wishlist-product-item-tax-display-mode",
      children: displayMode === "INCLUDING_FPT_AND_DESCRIPTION" ? "incl." : "excl."
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 44,
      columnNumber: 9
    }, void 0)]
  }, index, true, {
    fileName: _jsxFileName$3,
    lineNumber: 33,
    columnNumber: 7
  }, void 0))
}, void 0);
var _jsxFileName$2 = "/Users/ecornejo/Sites/storefront-wishlist/src/components/ProductItem/ProductItem.tsx";
const ProductItem = ({
  className,
  item,
  onCartActionButtonClick,
  onTrashButtonClick,
  fixedProductTaxesEnabled,
  fixedProductTaxesEnabledDisplayInProductLists,
  routeProdDetailPage,
  ...props
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const labels = useText({
    cartActionBtn: "ProductItem.CartActionButton",
    trashActionBtn: "ProductItem.TrashActionButton",
    customizeActionBtn: "ProductItem.CustomizeActionButton"
  });
  const discounted = ((_c = (_b = (_a = item.product) == null ? void 0 : _a.prices) == null ? void 0 : _b.discount) == null ? void 0 : _c.amountOff) !== 0 || ((_f = (_e = (_d = item.product) == null ? void 0 : _d.prices) == null ? void 0 : _e.discount) == null ? void 0 : _f.percentOff) !== 0;
  const renderImage = () => {
    var _a2;
    return u("a", {
      className: "wishlist-product-item-image",
      "data-testid": "wishlist-product-item-image",
      href: routeProdDetailPage(item.product),
      children: u(ImageCarousel, {
        images: ((_a2 = item.product) == null ? void 0 : _a2.image) ? [item.product.image] : []
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 70,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 65,
      columnNumber: 7
    }, void 0);
  };
  const renderPrices = () => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j;
    return u(Fragment, {
      children: [u(Price, {
        className: classes(["wishlist-product-item-price", discounted ? "strikeout" : ""]),
        "data-testid": "wishlist-product-item-price",
        amount: (_b2 = (_a2 = item.product) == null ? void 0 : _a2.prices) == null ? void 0 : _b2.regularPrice.value,
        currency: (_d2 = (_c2 = item.product) == null ? void 0 : _c2.prices) == null ? void 0 : _d2.regularPrice.currency
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 80,
        columnNumber: 9
      }, void 0), discounted && u(Price, {
        className: "wishlist-product-item-discounted-price",
        "data-testid": "wishlist-product-item-discounted-price",
        amount: (_f2 = (_e2 = item.product) == null ? void 0 : _e2.prices) == null ? void 0 : _f2.finalPrice.value,
        currency: (_h2 = (_g2 = item.product) == null ? void 0 : _g2.prices) == null ? void 0 : _h2.finalPrice.currency
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 91,
        columnNumber: 11
      }, void 0), fixedProductTaxesEnabled && (fixedProductTaxesEnabledDisplayInProductLists === "INCLUDING_FPT_AND_DESCRIPTION" || fixedProductTaxesEnabledDisplayInProductLists === "EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE") && ((_j = (_i2 = item.product) == null ? void 0 : _i2.prices) == null ? void 0 : _j.fixedProductTaxes) && u(TaxDetails, {
        taxes: item.product.prices.fixedProductTaxes,
        displayMode: fixedProductTaxesEnabledDisplayInProductLists
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 105,
        columnNumber: 13
      }, void 0)]
    }, void 0);
  };
  const renderTrashButton = () => {
    return u(Button, {
      "data-testid": "wishlist-product-item-remove-button",
      className: "wishlist-product-item-button__remove",
      variant: "tertiary",
      onClick: () => onTrashButtonClick == null ? void 0 : onTrashButtonClick(),
      icon: u(Icon, {
        source: SvgTrash,
        size: "24",
        stroke: "2",
        viewBox: "0 0 24 24",
        "aria-label": labels.trashActionBtn
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 122,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 116,
      columnNumber: 7
    }, void 0);
  };
  const renderMainActionButton = () => {
    return isProductReady() ? renderMoveToCartButton() : renderCustomizeButton();
  };
  const isProductReady = () => {
    var _a2, _b2, _c2, _d2;
    if (((_a2 = item.product) == null ? void 0 : _a2.type) === "ConfigurableProduct") {
      return areAllRequiredOptionsIncluded();
    }
    return ((_b2 = item.product) == null ? void 0 : _b2.type) !== "GiftCardProduct" && ((_c2 = item.product) == null ? void 0 : _c2.type) !== "BundleProduct" && ((_d2 = item.product) == null ? void 0 : _d2.type) !== "GroupedProduct";
  };
  const selectedOptions = ((_g = item.selectedOptions) == null ? void 0 : _g.map((opt) => opt.uid)) || [];
  const requiredOptions = ((_h = item.product.options) == null ? void 0 : _h.filter((option) => option.required)) || [];
  const areAllRequiredOptionsIncluded = () => {
    if (requiredOptions.length === 0) return true;
    return requiredOptions.every((option) => {
      var _a2;
      return (_a2 = option.values) == null ? void 0 : _a2.some((value) => selectedOptions.includes(value.uid));
    });
  };
  const renderOptions = () => {
    if (selectedOptions.length === 0) return null;
    return u("div", {
      className: "wishlist-product-item-options",
      children: requiredOptions.map((option) => {
        var _a2;
        const selectedValue = (_a2 = option.values) == null ? void 0 : _a2.find((value) => selectedOptions.includes(value.uid));
        return selectedValue ? u("div", {
          className: "wishlist-product-item-option",
          children: [u("span", {
            className: "wishlist-product-item-option__attribute",
            children: [option.attributeCode, ":"]
          }, void 0, true, {
            fileName: _jsxFileName$2,
            lineNumber: 178,
            columnNumber: 15
          }, void 0), " ", u("span", {
            className: "wishlist-product-item-option__label",
            children: selectedValue.label
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 182,
            columnNumber: 15
          }, void 0)]
        }, option.attributeCode, true, {
          fileName: _jsxFileName$2,
          lineNumber: 174,
          columnNumber: 13
        }, void 0) : null;
      })
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 168,
      columnNumber: 7
    }, void 0);
  };
  const renderMoveToCartButton = () => {
    var _a2;
    return u(Button, {
      "data-testid": "wishlist-product-item-move-to-cart-button",
      size: "medium",
      type: "submit",
      icon: u(Icon, {
        source: SvgCart
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 198,
        columnNumber: 15
      }, void 0),
      disabled: ((_a2 = item.product) == null ? void 0 : _a2.stockStatus) !== "IN_STOCK",
      "aria-label": labels.cartActionBtn,
      onClick: () => onCartActionButtonClick == null ? void 0 : onCartActionButtonClick(),
      children: labels.cartActionBtn
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 194,
      columnNumber: 7
    }, void 0);
  };
  const renderCustomizeButton = () => {
    return u(Button, {
      "data-testid": "wishlist-product-item-customize-button",
      size: "medium",
      type: "submit",
      "aria-label": labels.customizeActionBtn,
      href: routeProdDetailPage(item.product),
      children: labels.customizeActionBtn
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 210,
      columnNumber: 7
    }, void 0);
  };
  return u("div", {
    ...props,
    className: classes(["wishlist-product-item", className]),
    children: u("div", {
      className: "wishlist-product-item__content",
      children: [renderImage(), u("div", {
        className: "wishlist-product-item__title",
        "data-testid": "wishlist-product-item-header",
        children: [u("a", {
          className: "wishlist-product-item-name",
          "data-testid": "wishlist-product-item-name",
          href: routeProdDetailPage(item.product),
          children: (_i = item.product) == null ? void 0 : _i.name
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 230,
          columnNumber: 11
        }, void 0), renderTrashButton(), renderPrices()]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 226,
        columnNumber: 9
      }, void 0), renderOptions(), renderMainActionButton()]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 224,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 223,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/ecornejo/Sites/storefront-wishlist/src/components/ImageCarousel/ImageCarousel.tsx";
const ImageCarousel = ({
  className,
  children,
  images,
  ...props
}) => {
  const [carouselIndex, setCarouselIndex] = t(useState(0), "carouselIndex");
  return u(Fragment, {
    children: [u("div", {
      ...props,
      className: classes(["image-carousel", className]),
      children: u("div", {
        className: classes(["overflow-hidden relative max-w-[200px]", className]),
        children: images == null ? void 0 : images.map((image, index) => {
          return index === carouselIndex && u(Image, {
            className: "image-carousel-image",
            alt: image.alt,
            src: image.src
          }, void 0, false, {
            fileName: _jsxFileName$1,
            lineNumber: 56,
            columnNumber: 19
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 46,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 45,
      columnNumber: 7
    }, void 0), (images == null ? void 0 : images.length) > 1 && u("div", {
      className: classes(["absolute", "image-switcher-area"]),
      children: images == null ? void 0 : images.map((_image, index) => {
        return u("span", {
          className: classes(["image-switcher", carouselIndex === index ? "image-switcher-active" : "image-switcher-inactive"]),
          onClick: (event) => {
            setCarouselIndex(index);
            event.stopPropagation();
          }
        }, index, false, {
          fileName: _jsxFileName$1,
          lineNumber: 72,
          columnNumber: 17
        }, void 0);
      })
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 68,
      columnNumber: 9
    }, void 0)]
  }, void 0);
};
var _jsxFileName = "/Users/ecornejo/Sites/storefront-wishlist/src/containers/WishlistItem/WishlistItem.tsx";
const WishlistItem = ({
  initialData = null,
  moveProdToCart,
  routeProdDetailPage
}) => {
  var _a, _b, _c, _d, _e;
  if (!(initialData == null ? void 0 : initialData.product)) return null;
  const removeProductFromWishlist = async (showAlert = true) => {
    try {
      await removeProductsFromWishlist([initialData]);
      console.log(`Product ${initialData.product.sku} removed from wishlist!`);
      if (showAlert) {
        events.emit("wishlist/alert", {
          action: "remove",
          item: initialData
        });
      }
      return true;
    } catch (error) {
      console.error(`Product ${initialData.product.sku} could not be removed from wishlist`, error);
      return false;
    }
  };
  const moveProductToCart = async () => {
    var _a2;
    try {
      await moveProdToCart([{
        sku: initialData.product.sku,
        quantity: 1,
        optionsUIDs: (_a2 = initialData.selectedOptions) == null ? void 0 : _a2.map((option) => option.uid),
        enteredOptions: initialData.enteredOptions
      }]);
      console.log(`Product ${initialData.product.sku} successfully moved to cart 🛒`);
      events.emit("wishlist/alert", {
        action: "move",
        item: initialData
      });
      return await removeProductFromWishlist(false);
    } catch (error) {
      console.error("Could not move product to cart: ", error);
      if (error.toString().includes("You need to choose options for your item.")) {
        window.location.replace(routeProdDetailPage(initialData.product));
      }
      return false;
    }
  };
  return u(ProductItem, {
    item: initialData,
    onCartActionButtonClick: moveProductToCart,
    onTrashButtonClick: removeProductFromWishlist,
    fixedProductTaxesEnabled: ((_a = state.config) == null ? void 0 : _a.fixedProductTaxesEnabled) ?? false,
    fixedProductTaxesApply: ((_b = state.config) == null ? void 0 : _b.fixedProductTaxesApply) ?? false,
    fixedProductTaxesEnabledDisplayInProductLists: (_c = state.config) == null ? void 0 : _c.fixedProductTaxesEnabledDisplayInProductLists,
    fixedProductTaxesEnabledDisplayInProductView: (_d = state.config) == null ? void 0 : _d.fixedProductTaxesEnabledDisplayInProductView,
    fixedProductTaxesEnabledDisplayInSalesModules: (_e = state.config) == null ? void 0 : _e.fixedProductTaxesEnabledDisplayInSalesModules,
    routeProdDetailPage
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 106,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistItem as W
};
//# sourceMappingURL=WishlistItem.js.map
