/*! Copyright 2025 Adobe
All Rights Reserved. */
import { u, t } from "../chunks/jsxRuntime.module.js";
import { useState, useEffect, Fragment } from "@dropins/tools/preact-compat.js";
import { classes, VComponent } from "@dropins/tools/lib.js";
import { IllustratedMessage, Icon, Button, InLineAlert } from "@dropins/tools/components.js";
import { W as WishlistItem, S as SvgTrash, a as SvgCart } from "../chunks/WishlistItem.js";
import { a as SvgHeart, S as SvgHeartFilled } from "../chunks/HeartFilled.js";
import { useText, Text } from "@dropins/tools/i18n.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state } from "../chunks/removeProductsFromWishlist.js";
import { g as getWishlistById } from "../chunks/getWishlistById.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
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
  return u("div", {
    ...props,
    className: classes(["wishlist-empty-wishlist", className]),
    children: u(IllustratedMessage, {
      className: classes(["wishlist-empty-wishlist__wrapper", className]),
      "data-testid": "wishlist-empty-wishlist",
      heading: labels.emptyWishlist,
      icon: u(Icon, {
        className: "wishlist-empty-wishlist__icon",
        source: SvgHeart
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 49,
        columnNumber: 15
      }, void 0),
      message: u("p", {
        children: labels.message
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 50,
        columnNumber: 18
      }, void 0),
      action: ctaLinkURL ? u(Button, {
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
  const alertPlaceholder = alert ? u(VComponent, {
    node: alert,
    className: "wishlist-wishlist__alert"
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 56,
    columnNumber: 5
  }, void 0) : null;
  return u("div", {
    ...props,
    className: classes(["wishlist-wishlist", className]),
    children: [alertPlaceholder, products && heading && u("div", {
      "data-testid": "wishlist-heading-wrapper",
      className: classes(["wishlist-wishlist__heading"]),
      children: u(VComponent, {
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
    }, void 0), u("div", {
      className: classes(["wishlist-wishlist__content", ["wishlist-wishlist__content--empty", !products]]),
      children: products || u(VComponent, {
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
    }, void 0), u("div", {
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
  return u("div", {
    className: "wishlist-login__sign-in",
    children: [u("a", {
      "data-testid": "log-in-link",
      className: "wishlist-login__link",
      href: "/#",
      target: "_blank",
      rel: "noreferrer",
      children: u(Text, {
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
    }, void 0), u(Text, {
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
      setWishlistAlert(u(InLineAlert, {
        "data-testid": "wishlist-alert",
        heading: heading2,
        description: message.replace("{product}", item.product.name),
        type: "success",
        icon: u(Icon, {
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
  const emptyWishlist = u("div", {
    children: [u(EmptyWishlist, {
      "data-testid": "empty-wishlist",
      ctaLinkURL: routeEmptyWishlistCTA == null ? void 0 : routeEmptyWishlistCTA()
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 7
    }, void 0), !isLoggedIn && u(Login, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 23
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 155,
    columnNumber: 5
  }, void 0);
  const heading = u("div", {
    "data-testid": "default-wishlist-heading",
    children: (_a = dictionary.wishlistHeading) == null ? void 0 : _a.split(" {count}").map((title, index) => {
      var _a2, _b2;
      return u(Fragment, {
        children: [title, index === 0 && u("span", {
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
    return u(WishlistItem, {
      initialData: item,
      moveProdToCart
    }, (_a2 = item.product) == null ? void 0 : _a2.sku, false, {
      fileName: _jsxFileName,
      lineNumber: 184,
      columnNumber: 11
    }, void 0);
  }) : null;
  return u(Wishlist$1, {
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
