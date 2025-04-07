/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t, u } from "../chunks/jsxRuntime.module.js";
import { useState, useEffect } from "@dropins/tools/preact-compat.js";
import { e as events } from "../chunks/index.js";
import SvgHeart from "../chunks/Heart.js";
import SvgHeartFilled from "../chunks/HeartFilled.js";
import { s as state, g as getPersistedWishlistData, r as removeProductsFromWishlist } from "../chunks/removeProductsFromWishlist.js";
import { a as addProductsToWishlist } from "../chunks/getProductBySku.js";
import { I as Icon, B as Button } from "../chunks/Button.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/lib.js";
var _jsxFileName = "/Users/rafaljanicki/www/storefront-wishlist/src/containers/WishlistToggle/WishlistToggle.tsx";
const WishlistToggle = ({
  isGuestWishlistEnabled = false,
  product
}) => {
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  const [isWishlisted, setIsWishlisted] = t(useState(false), "isWishlisted");
  const [wishlistItem, setWishlistItem] = t(useState(null), "wishlistItem");
  useEffect(() => {
    var _a;
    const cachedWishlist = getPersistedWishlistData();
    if (cachedWishlist) {
      const item = (_a = cachedWishlist.items) == null ? void 0 : _a.find((item2) => item2.product.sku === product.sku);
      if (item) {
        setWishlistItem(item);
        setIsWishlisted(true);
      }
    }
    const handleAuthentication = (authenticated) => setIsLoggedIn(authenticated);
    const handleWishlistAdd = (update) => {
      if (update.action === "add" && update.item.product.sku === product.sku) {
        setWishlistItem(update.item);
        setIsWishlisted(true);
      }
    };
    events.on("authenticated", handleAuthentication);
    events.on("wishlist/update", handleWishlistAdd);
  }, [product.sku]);
  const handleClick = async () => {
    if (isWishlisted) {
      await removeProductsFromWishlist([wishlistItem]);
      setIsWishlisted(false);
    } else {
      await addProductsToWishlist([{
        sku: product.sku,
        quantity: 1
      }]);
    }
  };
  if (!isLoggedIn && !isGuestWishlistEnabled) {
    return null;
  }
  const icon = isWishlisted ? u("span", {
    "data-testid": "icon-filled",
    children: u(Icon, {
      source: SvgHeartFilled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 85,
    columnNumber: 5
  }, void 0) : u("span", {
    "data-testid": "icon-empty",
    children: u(Icon, {
      source: SvgHeart
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
  return u(Button, {
    "data-testid": "wishlist-toggle",
    size: "medium",
    variant: "tertiary",
    icon,
    onClick: handleClick
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 95,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistToggle,
  WishlistToggle as default
};
//# sourceMappingURL=WishlistToggle.js.map
