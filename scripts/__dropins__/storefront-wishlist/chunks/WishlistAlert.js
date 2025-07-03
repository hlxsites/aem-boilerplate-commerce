/*! Copyright 2025 Adobe
All Rights Reserved. */
import { Icon, InLineAlert } from "@dropins/tools/components.js";
import { u } from "./jsxRuntime.module.js";
import * as React from "@dropins/tools/preact-compat.js";
import { S as SvgCart, a as SvgTrash } from "./Trash.js";
import { S as SvgHeartFilled } from "./HeartFilled.js";
import { useText } from "@dropins/tools/i18n.js";
const SvgWarning = (props) => /* @__PURE__ */ React.createElement("svg", { id: "Icon_Warning_Base", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#clip0_841_1324)" }, /* @__PURE__ */ React.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.9949 2.30237L0.802734 21.6977H23.1977L11.9949 2.30237Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ React.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12.4336 10.5504L12.3373 14.4766H11.6632L11.5669 10.5504V9.51273H12.4336V10.5504ZM11.5883 18.2636V17.2687H12.4229V18.2636H11.5883Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "clip0_841_1324" }, /* @__PURE__ */ React.createElement("rect", { width: 24, height: 21, fill: "white", transform: "translate(0 1.5)" }))));
var _jsxFileName = "/Users/ecornejo/Sites/storefront-wishlist/src/containers/WishlistAlert/WishlistAlert.tsx";
const WishlistAlert = ({
  action,
  item,
  routeToWishlist
}) => {
  const dictionary = useText({
    addHeading: "Wishlist.Alert.addProduct.heading",
    addMessage: "Wishlist.Alert.addProduct.message",
    removeHeading: "Wishlist.Alert.removeProduct.heading",
    removeMessage: "Wishlist.Alert.removeProduct.message",
    moveHeading: "Wishlist.Alert.moveToCart.heading",
    moveMessage: "Wishlist.Alert.moveToCart.message",
    viewWishlist: "Wishlist.Alert.viewWishlist",
    addErrorHeading: "Wishlist.Alert.addError.heading",
    addErrorMessage: "Wishlist.Alert.addError.message",
    removeErrorHeading: "Wishlist.Alert.removeError.heading",
    removeErrorMessage: "Wishlist.Alert.removeError.message"
  });
  if (!action) {
    return null;
  }
  const heading = dictionary[`${action}Heading`];
  const message = dictionary[`${action}Message`];
  const iconMap = {
    add: SvgHeartFilled,
    remove: SvgTrash,
    move: SvgCart,
    addError: SvgWarning,
    removeError: SvgWarning
  };
  const isWishlistPage = routeToWishlist ? location.href.includes(routeToWishlist) : false;
  return u(InLineAlert, {
    "data-testid": "wishlist-alert",
    heading,
    description: item ? message.replace("{product}", item.product.name) : message,
    type: action === "addError" || action === "removeError" ? "warning" : "success",
    icon: u(Icon, {
      source: iconMap[action],
      size: "16"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 13
    }, void 0),
    actionButtonPosition: "top",
    additionalActions: !isWishlistPage && routeToWishlist ? [{
      label: dictionary.viewWishlist,
      onClick: () => {
        location.href = routeToWishlist;
      }
    }] : void 0
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 68,
    columnNumber: 5
  }, void 0);
};
export {
  WishlistAlert as W
};
//# sourceMappingURL=WishlistAlert.js.map
