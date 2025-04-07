/*! Copyright 2025 Adobe
All Rights Reserved. */
import { a as u, u as u$1, t } from "../chunks/jsxRuntime.module.js";
import { useState, useEffect, Fragment as Fragment$1 } from "@dropins/tools/preact-compat.js";
import { c as classes, B as Button$1, I as Icon$1 } from "../chunks/Button.js";
import { classes as classes$1, VComponent as VComponent$1 } from "@dropins/tools/lib.js";
import { useText, Text } from "@dropins/tools/i18n.js";
import SvgHeart from "../chunks/Heart.js";
import { W as WishlistItem } from "../chunks/WishlistItem.js";
import { Button, Icon, Card } from "@dropins/tools/components.js";
import { Fragment } from "@dropins/tools/preact.js";
import SvgCart from "../chunks/Cart.js";
import SvgHeartFilled from "../chunks/HeartFilled.js";
import SvgTrash from "../chunks/Trash.js";
import { e as events } from "../chunks/index.js";
import { s as state } from "../chunks/removeProductsFromWishlist.js";
import { g as getWishlistById } from "../chunks/getWishlistById.js";
import SvgClose from "../chunks/Close.js";
import "../chunks/devtools.module.js";
var _jsxFileName$6 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/lib/vcomponent.tsx";
function VComponent({
  node,
  ...props
}) {
  if (!node) return null;
  if (Array.isArray(node)) {
    return u(Fragment, {
      children: node.map((n, key) => u(VComponent, {
        node: n,
        className: props.className,
        ...props
      }, key, false, {
        fileName: _jsxFileName$6,
        lineNumber: 26,
        columnNumber: 11
      }, this))
    }, void 0);
  }
  props.className = classes([node.props.className, props.className]);
  return u(node.type, {
    ref: node.ref,
    ...node.props,
    ...props
  }, node.key, false, {
    fileName: _jsxFileName$6,
    lineNumber: 41,
    columnNumber: 10
  }, this);
}
var _jsxFileName$5 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/components/InLineAlert/InLineAlert.tsx";
const InLineAlert = ({
  variant = "primary",
  className,
  type = "warning",
  additionalActions,
  onDismiss,
  heading,
  description,
  icon,
  itemList,
  actionButtonPosition,
  ...props
}) => {
  var _a, _b, _c;
  const translations = useText({
    dismiss: "Dropin.InlineAlert.dismissLabel"
  });
  return u("div", {
    ...props,
    className: classes$1(["dropin-in-line-alert", `dropin-in-line-alert--${type}`, `dropin-in-line-alert--${variant}`, className]),
    children: [u("div", {
      className: "dropin-in-line-alert__heading",
      children: [u("div", {
        className: "dropin-in-line-alert__title-container",
        children: [icon && u(VComponent$1, {
          node: icon,
          className: "dropin-in-line-alert__icon"
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 64,
          columnNumber: 13
        }, void 0), u("span", {
          className: "dropin-in-line-alert__title",
          children: heading
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 67,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 62,
        columnNumber: 9
      }, void 0), u("div", {
        className: "dropin-in-line-alert__actions-container",
        children: [additionalActions && (actionButtonPosition === "top" || !actionButtonPosition && additionalActions.length <= 1) && u(Button, {
          variant: "tertiary",
          className: "dropin-in-line-alert__additional-action",
          onClick: additionalActions.length > 0 ? (_a = additionalActions[0]) == null ? void 0 : _a.onClick : void 0,
          "aria-label": (_b = additionalActions[0]) == null ? void 0 : _b.label,
          children: (_c = additionalActions[0]) == null ? void 0 : _c.label
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 74,
          columnNumber: 15
        }, void 0), onDismiss && u(Button, {
          icon: u(Icon, {
            source: SvgClose,
            size: "24",
            stroke: "2"
          }, void 0, false, {
            fileName: _jsxFileName$5,
            lineNumber: 89,
            columnNumber: 21
          }, void 0),
          className: "dropin-in-line-alert__dismiss-button",
          variant: "tertiary",
          onClick: onDismiss,
          "aria-label": translations.dismiss
        }, void 0, false, {
          fileName: _jsxFileName$5,
          lineNumber: 88,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$5,
        lineNumber: 70,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$5,
      lineNumber: 61,
      columnNumber: 7
    }, void 0), description && u("p", {
      className: "dropin-in-line-alert__description",
      children: description
    }, void 0, false, {
      fileName: _jsxFileName$5,
      lineNumber: 100,
      columnNumber: 9
    }, void 0), u("div", {
      className: "dropin-in-line-alert__item-list-container",
      children: itemList && u(VComponent$1, {
        node: itemList,
        className: classes$1(["dropin-in-line-alert__item-list"])
      }, void 0, false, {
        fileName: _jsxFileName$5,
        lineNumber: 104,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$5,
      lineNumber: 102,
      columnNumber: 7
    }, void 0), additionalActions && (actionButtonPosition === "bottom" || !actionButtonPosition && additionalActions.length > 1) && u("div", {
      className: "dropin-in-line-alert__additional-actions-container",
      children: additionalActions.map((action) => u(Button, {
        variant: "tertiary",
        className: "dropin-in-line-alert__additional-action",
        onClick: action.onClick,
        children: action.label
      }, action.label, false, {
        fileName: _jsxFileName$5,
        lineNumber: 115,
        columnNumber: 15
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName$5,
      lineNumber: 113,
      columnNumber: 11
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$5,
    lineNumber: 52,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$4 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/components/IllustratedMessage/IllustratedMessage.tsx";
const IllustratedMessage = ({
  className,
  icon,
  heading,
  headingLevel = 2,
  message,
  action,
  variant = "secondary",
  ...props
}) => {
  const Heading = headingLevel >= 1 && headingLevel <= 6 ? `h${headingLevel}` : "h2";
  return u("div", {
    ...props,
    className: classes$1(["dropin-illustrated-message", className]),
    children: u(Card, {
      variant,
      children: [icon && u(VComponent$1, {
        node: icon,
        "aria-hidden": "true",
        size: "80",
        className: "dropin-illustrated-message__icon"
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 48,
        columnNumber: 11
      }, void 0), heading && u(Heading, {
        className: "dropin-illustrated-message__heading",
        children: heading
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 57,
        columnNumber: 11
      }, void 0), message && u(VComponent$1, {
        node: message,
        className: "dropin-illustrated-message__message"
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 63,
        columnNumber: 11
      }, void 0), action && u(VComponent$1, {
        node: action,
        className: "dropin-illustrated-message__action"
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 70,
        columnNumber: 11
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 46,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$4,
    lineNumber: 42,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$3 = "/Users/rafaljanicki/www/storefront-wishlist/src/components/EmptyWishlist/EmptyWishlist.tsx";
const EmptyWishlist = ({
  className,
  children,
  ctaLinkURL,
  ...props
}) => {
  const labels = useText({
    emptyWishlist: "Wishlist.EmptyWishlist.heading",
    message: "Wishlist.EmptyWishlist.message",
    cta: "Wishlist.EmptyWishlist.cta"
  });
  return u$1("div", {
    ...props,
    className: classes(["wishlist-empty-wishlist", className]),
    children: u$1(IllustratedMessage, {
      className: classes(["wishlist-empty-wishlist__wrapper", className]),
      "data-testid": "wishlist-empty-wishlist",
      heading: labels.emptyWishlist,
      icon: u$1(Icon$1, {
        className: "wishlist-empty-wishlist__icon",
        source: SvgHeart
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 49,
        columnNumber: 15
      }, void 0),
      message: u$1("p", {
        children: labels.message
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 50,
        columnNumber: 18
      }, void 0),
      action: ctaLinkURL ? u$1(Button$1, {
        "data-testid": "wishlist-empty-wishlist-button",
        size: "medium",
        variant: "primary",
        type: "submit",
        href: ctaLinkURL,
        children: labels.cta
      }, "routeHome", false, {
        fileName: _jsxFileName$3,
        lineNumber: 53,
        columnNumber: 13
      }, void 0) : void 0
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 45,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$3,
    lineNumber: 44,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-wishlist/src/components/Wishlist/Wishlist.tsx";
const Wishlist$1 = ({
  className,
  children,
  heading,
  emptyWishlist,
  products,
  wishlistAlert,
  ...props
}) => {
  const [alert, setAlert] = t(useState(wishlistAlert), "alert");
  useEffect(() => {
    if (wishlistAlert) {
      setAlert(wishlistAlert);
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5e3);
      return () => clearTimeout(timer);
    }
  }, [wishlistAlert]);
  const alertPlaceholder = alert ? u$1(VComponent, {
    node: alert,
    className: "wishlist-wishlist__alert"
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 56,
    columnNumber: 5
  }, void 0) : null;
  return u$1("div", {
    ...props,
    className: classes(["wishlist-wishlist", className]),
    children: [alertPlaceholder, products && heading && u$1("div", {
      "data-testid": "wishlist-heading-wrapper",
      className: classes(["wishlist-wishlist__heading"]),
      children: u$1(VComponent, {
        node: heading,
        className: "wishlist-wishlist__heading-text"
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 67,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 63,
      columnNumber: 9
    }, void 0), u$1("div", {
      className: classes(["wishlist-wishlist__content", ["wishlist-wishlist__content--empty", !products]]),
      children: products || u$1(VComponent, {
        node: emptyWishlist
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 79,
        columnNumber: 22
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 73,
      columnNumber: 7
    }, void 0), u$1("div", {
      "data-testid": "wishlist-infinite-scroll-trigger-test",
      id: "wishlist-infinite-scroll-trigger"
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 82,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 60,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-wishlist/src/components/Login/Login.tsx";
const Login = () => {
  return u$1("div", {
    className: "wishlist-login__sign-in",
    children: [u$1("a", {
      "data-testid": "log-in-link",
      className: "wishlist-login__link",
      href: "/#",
      target: "_blank",
      rel: "noreferrer",
      children: u$1(Text, {
        id: "Wishlist.Login.logIn"
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 33,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 26,
      columnNumber: 7
    }, void 0), u$1(Text, {
      id: "Wishlist.Login.sync"
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 35,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
const PAGE_SIZE = 4;
var _jsxFileName = "/Users/rafaljanicki/www/storefront-wishlist/src/containers/Wishlist/Wishlist.tsx";
const Wishlist = ({
  routeEmptyWishlistCTA,
  moveProdToCart,
  ...props
}) => {
  var _a, _b;
  const [wishlistData, setWishlistData] = t(useState(null), "wishlistData");
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  let [currentPage, setCurrentPage] = t(useState(1), "currentPage");
  let [canScroll, setCanScroll] = t(useState(true), "canScroll");
  const dictionary = useText({
    wishlistHeading: "Wishlist.Wishlist.heading",
    addHeading: "Wishlist.Alert.addProduct.heading",
    addMessage: "Wishlist.Alert.addProduct.message",
    removeHeading: "Wishlist.Alert.removeProduct.heading",
    removeMessage: "Wishlist.Alert.removeProduct.message",
    moveHeading: "Wishlist.Alert.moveToCart.heading",
    moveMessage: "Wishlist.Alert.moveToCart.message",
    viewWishlist: "Wishlist.Alert.viewWishlist"
  });
  const infiniteScrollLoader = async (targets) => {
    if (!canScroll || !targets[0].isIntersecting) {
      return;
    }
    setCurrentPage(() => currentPage += 1);
    const nextPage = await getWishlistById(state.wishlistId, currentPage, PAGE_SIZE);
    if (currentPage > nextPage.total_pages) {
      setCanScroll(() => {
        canScroll = false;
      });
      return;
    }
    setWishlistData((prev) => {
      return {
        id: prev.id,
        items: [...prev.items, ...nextPage.items],
        items_count: prev.items_count
      };
    });
  };
  const observer = new IntersectionObserver(infiniteScrollLoader, {
    root: document.querySelector(".wishlist-wishlist"),
    rootMargin: "0px",
    threshold: 1
  });
  const [wishlistAlert, setWishlistAlert] = t(useState(null), "wishlistAlert");
  useEffect(() => {
    const handleWishlistAlert = (payload) => {
      const {
        action,
        item
      } = payload;
      const heading2 = dictionary[`${action}Heading`];
      const message = dictionary[`${action}Message`];
      const iconMap = {
        add: SvgHeartFilled,
        remove: SvgTrash,
        move: SvgCart
      };
      setWishlistAlert(u$1(InLineAlert, {
        "data-testid": "wishlist-alert",
        heading: heading2,
        description: message.replace("{product}", item.product.name),
        type: "success",
        icon: u$1(Icon$1, {
          source: iconMap[action],
          size: "16"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 119,
          columnNumber: 17
        }, void 0),
        actionButtonPosition: "top",
        additionalActions: [{
          label: dictionary.viewWishlist,
          onClick: () => {
          }
        }]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 114,
        columnNumber: 9
      }, void 0));
    };
    events.on("wishlist/update", (payload) => handleWishlistAlert(payload));
    const dataEvent = events.on("wishlist/data", async (payload) => {
      if (state.authenticated && state.wishlistId) {
        const loggedInUserWishlist = await getWishlistById(state.wishlistId, currentPage, PAGE_SIZE);
        setWishlistData(loggedInUserWishlist);
        observer.observe(document.querySelector("#wishlist-infinite-scroll-trigger"));
      } else {
        setWishlistData(payload);
      }
    }, {
      eager: true
    });
    return () => dataEvent == null ? void 0 : dataEvent.off();
  }, []);
  const emptyWishlist = u$1("div", {
    children: [u$1(EmptyWishlist, {
      "data-testid": "empty-wishlist",
      ctaLinkURL: routeEmptyWishlistCTA == null ? void 0 : routeEmptyWishlistCTA()
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 7
    }, void 0), !isLoggedIn && u$1(Login, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 23
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 155,
    columnNumber: 5
  }, void 0);
  const heading = u$1("div", {
    "data-testid": "default-wishlist-heading",
    children: (_a = dictionary.wishlistHeading) == null ? void 0 : _a.split(" {count}").map((title, index) => {
      var _a2, _b2;
      return u$1(Fragment$1, {
        children: [title, index === 0 && u$1("span", {
          className: "wishlist-wishlist__heading-count",
          children: ` ${(_a2 = wishlistData == null ? void 0 : wishlistData.items) == null ? void 0 : _a2.length} products`
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 172,
          columnNumber: 15
        }, void 0)]
      }, ((_b2 = wishlistData == null ? void 0 : wishlistData.id) == null ? void 0 : _b2.toString()) + index, true, {
        fileName: _jsxFileName,
        lineNumber: 169,
        columnNumber: 11
      }, void 0);
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 165,
    columnNumber: 5
  }, void 0);
  const products = ((_b = wishlistData == null ? void 0 : wishlistData.items) == null ? void 0 : _b.length) > 0 ? wishlistData.items.map((item) => {
    var _a2;
    return u$1(WishlistItem, {
      initialData: item,
      moveProdToCart
    }, (_a2 = item.product) == null ? void 0 : _a2.sku, false, {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 11
    }, void 0);
  }) : null;
  return u$1(Wishlist$1, {
    ...props,
    heading,
    emptyWishlist,
    products,
    wishlistAlert
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 193,
    columnNumber: 5
  }, void 0);
};
export {
  Wishlist,
  Wishlist as default
};
//# sourceMappingURL=Wishlist.js.map
