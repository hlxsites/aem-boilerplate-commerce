/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t } from "../chunks/devtools.module.js";
import { useState, useCallback, useEffect } from "@dropins/tools/preact-compat.js";
import { Icon, Button } from "@dropins/tools/components.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state, g as getPersistedWishlistData, i as isMatchingWishlistItem, r as removeProductsFromWishlist } from "../chunks/removeProductsFromWishlist.js";
import { u } from "../chunks/jsxRuntime.module.js";
import { c as config, a as addProductsToWishlist } from "../chunks/mergeWishlists.js";
import { S as SvgHeartFilled } from "../chunks/HeartFilled.js";
import { S as SvgHeart } from "../chunks/Heart.js";
import { useText } from "@dropins/tools/i18n.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
import "@dropins/tools/lib.js";
var _jsxFileName = "/Users/ecornejo/Sites/storefront-wishlist/src/containers/WishlistToggle/WishlistToggle.tsx";
const WishlistToggle = ({
  product,
  iconWishlisted,
  iconToWishlist,
  size,
  variant,
  disabled,
  labelToWishlist,
  labelWishlisted,
  onClick,
  removeProdFromCart
}) => {
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  const [isWishlisted, setIsWishlisted] = t(useState(false), "isWishlisted");
  const [wishlistItem, setWishlistItem] = t(useState(null), "wishlistItem");
  const {
    isGuestWishlistEnabled
  } = config.getConfig();
  const dictionary = useText({
    addToWishlist: "Wishlist.Wishlist.ariaLabelAddToWishlist",
    removeFromWishlist: "Wishlist.Wishlist.ariaLabelRemoveFromWishlist"
  });
  const handleWishlistData = useCallback(() => {
    var _a;
    const updatedWishlist = getPersistedWishlistData();
    const item = (_a = updatedWishlist == null ? void 0 : updatedWishlist.items) == null ? void 0 : _a.find((item2) => isMatchingWishlistItem(item2, {
      sku: product.topLevelSku ?? product.sku,
      optionUIDs: product.optionUIDs ?? (product.selectedOptionsUIDs ? Object.values(product.selectedOptionsUIDs) : void 0)
    }));
    setWishlistItem(item ?? null);
    setIsWishlisted(!!item);
  }, [product.topLevelSku, product.sku, product.optionUIDs, product.selectedOptionsUIDs]);
  useEffect(() => {
    handleWishlistData();
  }, [handleWishlistData]);
  useEffect(() => {
    const handleAuthentication = (authenticated) => setIsLoggedIn(authenticated);
    const onAuthenticated = events.on("authenticated", handleAuthentication);
    const onWishlistData = events.on("wishlist/data", handleWishlistData);
    return () => {
      onAuthenticated == null ? void 0 : onAuthenticated.off();
      onWishlistData == null ? void 0 : onWishlistData.off();
    };
  }, [handleWishlistData]);
  const handleClick = async () => {
    var _a;
    if (isWishlisted) {
      try {
        await removeProductsFromWishlist([wishlistItem]);
      } catch (error) {
        events.emit("wishlist/alert", {
          action: "removeError",
          item: wishlistItem
        });
        return null;
      }
      setIsWishlisted(false);
      events.emit("wishlist/alert", {
        action: "remove",
        item: wishlistItem
      });
    } else {
      try {
        await addProductsToWishlist([{
          sku: product.topLevelSku ?? product.sku,
          quantity: 1,
          optionsUIDs: product.optionUIDs ?? (product.selectedOptionsUIDs ? Object.values(product.selectedOptionsUIDs) : void 0),
          enteredOptions: ((_a = product.options) == null ? void 0 : _a.items) ? product.options.items.filter((option) => option.selected).map((option) => ({
            uid: option.uid,
            value: option.value
          })) : void 0
        }]);
      } catch (error) {
        events.emit("wishlist/alert", {
          action: "addError"
        });
        return null;
      }
      setIsWishlisted(true);
      events.emit("wishlist/alert", {
        action: "add",
        item: {
          product
        }
      });
      if (removeProdFromCart) {
        await removeProdFromCart([{
          uid: product.uid,
          quantity: 0
        }]);
      }
    }
  };
  if (!isLoggedIn && !isGuestWishlistEnabled) {
    return null;
  }
  const ariaLabel = isWishlisted ? dictionary["removeFromWishlist"].replace("{PRODUCT_NAME}", product == null ? void 0 : product.name) : dictionary["addToWishlist"].replace("{PRODUCT_NAME}", product == null ? void 0 : product.name);
  return u(Button, {
    active: isWishlisted,
    "aria-label": ariaLabel,
    "data-testid": "wishlist-toggle",
    size: size ?? "medium",
    variant: variant ?? "tertiary",
    disabled,
    icon: u(Icon, {
      source: iconToWishlist ?? SvgHeart
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 13
    }, void 0),
    activeIcon: u(Icon, {
      source: iconWishlisted ?? SvgHeartFilled
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 19
    }, void 0),
    onClick: onClick ?? handleClick,
    children: labelToWishlist,
    activeChildren: labelWishlisted
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 187,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistToggle,
  WishlistToggle as default
};
//# sourceMappingURL=WishlistToggle.js.map
