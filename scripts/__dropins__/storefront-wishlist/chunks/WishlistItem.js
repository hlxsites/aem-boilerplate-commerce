/*! Copyright 2025 Adobe
All Rights Reserved. */
import { a as u, u as u$1, t as t$1 } from "./jsxRuntime.module.js";
import { useState, useMemo } from "@dropins/tools/preact-compat.js";
import { generateSrcset, classes } from "@dropins/tools/lib.js";
import { useText } from "@dropins/tools/i18n.js";
import { c as classes$1, B as Button, I as Icon } from "./Button.js";
import SvgCart from "./Cart.js";
import SvgTrash from "./Trash.js";
import { t } from "./devtools.module.js";
import { Fragment } from "@dropins/tools/preact.js";
import { e as events } from "./index.js";
import { r as removeProductsFromWishlist } from "./removeProductsFromWishlist.js";
var _jsxFileName$4 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/components/Image/Image.tsx";
const Image = ({
  className,
  src,
  params,
  loading = "lazy",
  srcSet,
  onLoad,
  ...props
}) => {
  const [loaded, setLoaded] = t(useState(false), "loaded");
  const _srcSet = t(useMemo(() => {
    if (srcSet) return srcSet;
    if (!src || !params) return;
    return generateSrcset(src, {
      ...params
    });
  }, [params, src, srcSet]), "_srcSet");
  const onLoadHandler = (e) => {
    setLoaded(true);
    onLoad == null ? void 0 : onLoad(e);
  };
  return u("img", {
    ...props,
    className: classes(["dropin-image", ["dropin-image--loaded", loaded], className]),
    loading,
    onLoad: onLoadHandler,
    src,
    srcSet: _srcSet
  }, void 0, false, {
    fileName: _jsxFileName$4,
    lineNumber: 53,
    columnNumber: 5
  }, void 0);
};
var define_process_env_default = {};
var _jsxFileName$3 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/components/Price/Price.tsx";
const Price = ({
  amount = 0,
  currency,
  locale = define_process_env_default.LOCALE ?? void 0,
  variant = "default",
  weight = "bold",
  className,
  children,
  sale = false,
  formatOptions = {},
  size = "small",
  ...props
}) => {
  const formatter = t(useMemo(() => new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency || "USD",
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2,
    // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2,
    // (causes 2500.99 to be printed as $2,501)
    ...formatOptions
  }), [locale, currency, formatOptions]), "formatter");
  const formattedAmount = t(useMemo(() => formatter.format(amount), [amount, formatter]), "formattedAmount");
  return u("span", {
    ...props,
    className: classes(["dropin-price", `dropin-price--${variant}`, `dropin-price--${size}`, `dropin-price--${weight}`, ["dropin-price--sale", sale], className]),
    children: formattedAmount
  }, void 0, false, {
    fileName: _jsxFileName$3,
    lineNumber: 61,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-wishlist/src/components/ProductItem/ProductItem.tsx";
const ProductItem = ({
  className,
  children,
  item,
  onCartActionButtonClick,
  onTrashButtonClick,
  ...props
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const labels = useText({
    cartActionBtn: "ProductItem.CartActionButton",
    trashActionBtn: "ProductItem.TrashActionButton"
  });
  const discounted = ((_b = (_a = item == null ? void 0 : item.prices) == null ? void 0 : _a.discount) == null ? void 0 : _b.amountOff) != 0 || ((_d = (_c = item == null ? void 0 : item.prices) == null ? void 0 : _c.discount) == null ? void 0 : _d.percentOff) != 0;
  return u$1("div", {
    ...props,
    className: classes$1(["wishlist-product-item", className]),
    children: u$1("div", {
      ...props,
      className: classes$1(["wishlist-product-item__content", className]),
      children: [u$1("div", {
        className: classes$1(["wishlist-product-item-image"]),
        style: {
          backgroundColor: "var(--color-neutral-200)"
        },
        "data-testid": "wishlist-product-item-image",
        children: u$1(ImageCarousel, {
          images: (item == null ? void 0 : item.image) ? [item.image] : []
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 63,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 58,
        columnNumber: 9
      }, void 0), u$1("div", {
        className: classes$1(["wishlist-product-item__title"]),
        "data-testid": "wishlist-product-item-header",
        children: [
          u$1("span", {
            className: "wishlist-product-item-name",
            "data-testid": "wishlist-product-item-name",
            children: item == null ? void 0 : item.name
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 70,
            columnNumber: 11
          }, void 0),
          u$1(Button, {
            "data-testid": "wishlist-product-item-remove-button",
            className: classes$1(["wishlist-product-item-button__remove"]),
            variant: "tertiary",
            onClick: () => onTrashButtonClick == null ? void 0 : onTrashButtonClick(),
            icon: u$1(Icon, {
              source: SvgTrash,
              size: "24",
              stroke: "2",
              viewBox: "0 0 24 24",
              "aria-label": labels.trashActionBtn
            }, void 0, false, {
              fileName: _jsxFileName$2,
              lineNumber: 84,
              columnNumber: 15
            }, void 0)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 78,
            columnNumber: 11
          }, void 0),
          u$1(Price, {
            className: classes$1(["wishlist-product-item-price", discounted ? "strikeout" : ""]),
            "data-testid": "wishlist-product-item-price",
            amount: (_e = item == null ? void 0 : item.prices) == null ? void 0 : _e.regularPrice.value,
            currency: (_f = item == null ? void 0 : item.prices) == null ? void 0 : _f.regularPrice.currency
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 94,
            columnNumber: 11
          }, void 0),
          /* Discounted price */
          discounted && u$1(Price, {
            className: classes$1(["wishlist-product-item-discounted-price"]),
            "data-testid": "wishlist-product-item-discounted-price",
            amount: (_g = item == null ? void 0 : item.prices) == null ? void 0 : _g.finalPrice.value,
            currency: (_h = item == null ? void 0 : item.prices) == null ? void 0 : _h.finalPrice.currency
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 106,
            columnNumber: 15
          }, void 0)
        ]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 66,
        columnNumber: 9
      }, void 0), u$1(Button, {
        "data-testid": "wishlist-product-item-move-to-cart-button",
        size: "medium",
        type: "submit",
        icon: u$1(Icon, {
          source: SvgCart
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 121,
          columnNumber: 17
        }, void 0),
        disabled: (item == null ? void 0 : item.stockStatus) !== "IN_STOCK",
        "aria-label": labels.moveItemToCart,
        onClick: () => onCartActionButtonClick == null ? void 0 : onCartActionButtonClick(),
        children: labels.cartActionBtn
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 117,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 54,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 53,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-wishlist/src/components/ImageCarousel/ImageCarousel.tsx";
const ImageCarousel = ({
  className,
  children,
  images,
  ...props
}) => {
  const [carouselIndex, setCarouselIndex] = t$1(useState(0), "carouselIndex");
  return u$1(Fragment, {
    children: [u$1("div", {
      ...props,
      className: classes$1(["image-carousel", className]),
      children: u$1("div", {
        className: classes$1(["overflow-hidden relative max-w-[200px]", className]),
        children: images == null ? void 0 : images.map((image, index) => {
          return index === carouselIndex && u$1(Image, {
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
    }, void 0), (images == null ? void 0 : images.length) > 1 && u$1("div", {
      className: classes$1(["absolute", "image-switcher-area"]),
      children: images == null ? void 0 : images.map((_image, index) => {
        return u$1("span", {
          className: classes$1(["image-switcher", carouselIndex === index ? "image-switcher-active" : "image-switcher-inactive"]),
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
var _jsxFileName = "/Users/rafaljanicki/www/storefront-wishlist/src/containers/WishlistItem/WishlistItem.tsx";
const WishlistItem = ({
  initialData = null,
  moveProdToCart
}) => {
  const [item] = t$1(useState(initialData), "item");
  const removeProductFromWishlist = (showAlert = true) => {
    return removeProductsFromWishlist([item]).then(() => {
      var _a;
      console.log(`Product ${(_a = item == null ? void 0 : item.product) == null ? void 0 : _a.sku} removed from wishlist!`);
      if (showAlert) events.emit("wishlist/update", {
        action: "remove",
        item
      });
      return true;
    }).catch((error) => {
      var _a;
      console.error(`Product ${(_a = item == null ? void 0 : item.product) == null ? void 0 : _a.sku} could not be removed from wishlist`, error);
      return false;
    });
  };
  const moveProductToCart = async () => {
    var _a;
    return await moveProdToCart([{
      sku: (_a = item == null ? void 0 : item.product) == null ? void 0 : _a.sku,
      quantity: 1
    }]).then(() => {
      var _a2;
      console.log(`Product ${(_a2 = item == null ? void 0 : item.product) == null ? void 0 : _a2.sku} successfully moved to cart 🛒!`);
      events.emit("wishlist/update", {
        action: "move",
        item
      });
      return removeProductFromWishlist(false);
    }).catch((error) => {
      console.error("Cart creation/update failed: ", error);
      return false;
    });
  };
  if (!(item == null ? void 0 : item.product)) return null;
  return u$1("div", {
    "data-testid": "wishlist-items",
    children: u$1(ProductItem, {
      item: item.product,
      onCartActionButtonClick: () => moveProductToCart(),
      onTrashButtonClick: () => removeProductFromWishlist()
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 89,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistItem as W
};
//# sourceMappingURL=WishlistItem.js.map
