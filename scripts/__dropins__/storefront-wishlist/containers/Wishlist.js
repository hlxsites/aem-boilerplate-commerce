/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t } from "../chunks/devtools.module.js";
import { useState, useCallback, useEffect, useMemo, Fragment } from "@dropins/tools/preact-compat.js";
import { classes, VComponent } from "@dropins/tools/lib.js";
import { IllustratedMessage, Button, Icon, SkeletonRow, Skeleton } from "@dropins/tools/components.js";
import { W as WishlistItem } from "../chunks/WishlistItem.js";
import { u } from "../chunks/jsxRuntime.module.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state, g as getPersistedWishlistData } from "../chunks/removeProductsFromWishlist.js";
import { useText, Text } from "@dropins/tools/i18n.js";
import { Fragment as Fragment$1 } from "@dropins/tools/preact.js";
import { W as WishlistAlert } from "../chunks/WishlistAlert.js";
import { S as SvgHeart } from "../chunks/Heart.js";
import "../chunks/Trash.js";
import "@dropins/tools/fetch-graphql.js";
import "../chunks/HeartFilled.js";
var _jsxFileName$5 = "/Users/ecornejo/Sites/storefront-wishlist/src/components/EmptyWishlist/EmptyWishlist.tsx";
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
        fileName: _jsxFileName$5,
        lineNumber: 49,
        columnNumber: 15
      }, void 0),
      message: u("p", {
        children: labels.message
      }, void 0, false, {
        fileName: _jsxFileName$5,
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
        fileName: _jsxFileName$5,
        lineNumber: 53,
        columnNumber: 13
      }, void 0) : void 0
    }, void 0, false, {
      fileName: _jsxFileName$5,
      lineNumber: 45,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$5,
    lineNumber: 44,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$4 = "/Users/ecornejo/Sites/storefront-wishlist/src/components/Wishlist/WishlistItemSkeleton.tsx";
const WishlistItemSkeleton = () => {
  return u(SkeletonRow, {
    children: `
      <svg
          width="100%"
          height="100%"
          viewBox="0 0 288 658"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
        >
        <rect x="6" y="24" width="282px" height="480" rx="8" fill="#E8E8E8" />
        <rect x="6" y="522" width="280" height="22" rx="4" fill="#E8E8E8" />
        <rect x="6" y="556" width="132" height="22" rx="4" fill="#E8E8E8" />
        <rect x="6" y="592" width="280" height="48" rx="24" fill="#D9D9D9" />
      </svg>
    `
  }, void 0, false, {
    fileName: _jsxFileName$4,
    lineNumber: 23,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$3 = "/Users/ecornejo/Sites/storefront-wishlist/src/components/Wishlist/WishlistSkeleton.tsx";
const WishlistSkeleton = () => {
  return u(Skeleton, {
    "data-testid": "wishlist-loader",
    children: [u(WishlistItemSkeleton, {}, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 25,
      columnNumber: 7
    }, void 0), u(WishlistItemSkeleton, {}, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 26,
      columnNumber: 7
    }, void 0), u(WishlistItemSkeleton, {}, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 27,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$3,
    lineNumber: 24,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$2 = "/Users/ecornejo/Sites/storefront-wishlist/src/containers/Wishlist/Wishlist.tsx";
const Wishlist$1 = ({
  routeEmptyWishlistCTA,
  routeToWishlist,
  moveProdToCart,
  routeProdDetailPage,
  ...props
}) => {
  const [wishlistData, setWishlistData] = t(useState(null), "wishlistData");
  const [isLoggedIn, setIsLoggedIn] = t(useState(state.authenticated), "isLoggedIn");
  const [isLoading, setIsLoading] = t(useState(() => {
    // Smart initial state - check if initialization already completed
    const existingData = getPersistedWishlistData();
    
    // If we have data, we're not loading
    if (existingData && existingData.items !== undefined) {
      return false;
    }
    
    // If initialization already finished but no data, we're not loading
    if (!state.initializing && state.isLoading === false) {
      return false;
    }
    
    // Otherwise, we are loading
    return true;
  }), "isLoading");
  const handleAuthentication = (authenticated) => setIsLoggedIn(authenticated);
  const [wishlistAlert, setWishlistAlert] = t(useState(null), "wishlistAlert");
  const handleWishlistAlert = useCallback((payload) => {
    const {
      action,
      item
    } = payload;
    setWishlistAlert(u(WishlistAlert, {
      action,
      item,
      routeToWishlist
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 59,
      columnNumber: 9
    }, void 0));
  }, [routeToWishlist]);
    useEffect(() => {
    // Initialize with existing data if available
    const existingData = getPersistedWishlistData();
    if (existingData && existingData.items !== undefined && !wishlistData) {
      setWishlistData(existingData);
      setIsLoading(false);
    }
    
    // Check if initialization already completed while we were mounting
    if (isLoading && !state.initializing && state.isLoading === false) {
      setIsLoading(false);
      if (!wishlistData && existingData) {
        setWishlistData(existingData);
      }
    }
    
    // Set up event listeners
    const authEvent = events.on("authenticated", handleAuthentication);
    const updateEvent = events.on("wishlist/alert", handleWishlistAlert);
    const dataEvent = events.on("wishlist/data", (payload) => {
      setWishlistData(payload);
      setIsLoading(false);
    }, {
      eager: true
    });
    const initEvent = events.on("wishlist/initialized", (payload) => {
      setWishlistData(payload);
      setIsLoading(false);
    }, {
      eager: true
    });
    
    return () => {
      authEvent?.off();
      dataEvent?.off();
      updateEvent?.off();
      initEvent?.off();
    };
  }, [handleWishlistAlert, wishlistData, isLoading]);
  return u(Wishlist, {
    ...props,
    wishlistData,
    wishlistAlert,
    routeEmptyWishlistCTA,
    moveProdToCart,
    isLoggedIn,
    isLoading,
    routeProdDetailPage
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 118,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/ecornejo/Sites/storefront-wishlist/src/components/Wishlist/Wishlist.tsx";
const Wishlist = ({
  className,
  wishlistData,
  wishlistAlert,
  isLoggedIn,
  isLoading,
  moveProdToCart,
  routeEmptyWishlistCTA,
  onLoginClick,
  routeProdDetailPage,
  ...props
}) => {
  const [alert, setAlert] = t(useState(wishlistAlert), "alert");
  const dictionary = useText({
    wishlistHeading: "Wishlist.Wishlist.heading",
    wishlistLoadingHeading: "Wishlist.Wishlist.loading"
  });
  const products = t(useMemo(() => {
    var _a;
    return ((_a = wishlistData == null ? void 0 : wishlistData.items) == null ? void 0 : _a.length) > 0 ? wishlistData.items.map((item) => {
      var _a2;
      return u(WishlistItem, {
        initialData: item,
        moveProdToCart,
        routeProdDetailPage
      }, (_a2 = item.product) == null ? void 0 : _a2.sku, false, {
        fileName: _jsxFileName$1,
        lineNumber: 70,
        columnNumber: 11
      }, void 0);
    }) : null;
  }, [wishlistData, moveProdToCart, routeProdDetailPage]), "products");
  useEffect(() => {
    if (wishlistAlert) {
      setAlert(wishlistAlert);
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5e3);
      return () => clearTimeout(timer);
    }
  }, [wishlistAlert]);
  const renderAlert = t(useMemo(() => alert ? u(VComponent, {
    node: alert,
    className: "wishlist-wishlist__alert"
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 95,
    columnNumber: 9
  }, void 0) : null, [alert]), "renderAlert");
  const renderLoader = () => {
    return u(Fragment$1, {
      children: [u("div", {
        className: "wishlist-wishlist__heading",
        "data-testid": "wishlist-heading-wrapper",
        children: u("div", {
          className: "wishlist-wishlist__heading-text",
          "data-testid": "loader-wishlist-heading",
          children: dictionary.wishlistLoadingHeading
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 107,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 103,
        columnNumber: 9
      }, void 0), u(WishlistSkeleton, {}, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 114,
        columnNumber: 9
      }, void 0)]
    }, void 0);
  };
  const renderWishlist = () => {
    return products ? u(Fragment$1, {
      children: [renderHeading, u("div", {
        className: "wishlist-wishlist__content",
        children: products
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 123,
        columnNumber: 9
      }, void 0)]
    }, void 0) : u("div", {
      className: classes(["wishlist-wishlist__content", "wishlist-wishlist__content--empty"]),
      children: u("div", {
        children: [u(EmptyWishlist, {
          "data-testid": "empty-wishlist",
          ctaLinkURL: routeEmptyWishlistCTA == null ? void 0 : routeEmptyWishlistCTA()
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 133,
          columnNumber: 11
        }, void 0), !isLoggedIn && u(Login, {
          onLoginClick
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 137,
          columnNumber: 27
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 132,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 126,
      columnNumber: 7
    }, void 0);
  };
  const renderHeading = t(useMemo(() => {
    var _a;
    if (!products) return null;
    return u("div", {
      className: "wishlist-wishlist__heading",
      "data-testid": "wishlist-heading-wrapper",
      children: u("div", {
        className: "wishlist-wishlist__heading-text",
        "data-testid": "default-wishlist-heading",
        children: (_a = dictionary.wishlistHeading) == null ? void 0 : _a.split(" {count}").map((title, index) => {
          var _a2;
          return u(Fragment, {
            children: [title, index === 0 && u("span", {
              className: "wishlist-wishlist__heading-count",
              "data-testid": "wishlist-heading-count",
              children: `${wishlistData == null ? void 0 : wishlistData.items_count} products`
            }, void 0, false, {
              fileName: _jsxFileName$1,
              lineNumber: 161,
              columnNumber: 19
            }, void 0)]
          }, ((_a2 = wishlistData == null ? void 0 : wishlistData.id) == null ? void 0 : _a2.toString()) + index, true, {
            fileName: _jsxFileName$1,
            lineNumber: 158,
            columnNumber: 15
          }, void 0);
        })
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 151,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 147,
      columnNumber: 7
    }, void 0);
  }, [dictionary, products, wishlistData]), "renderHeading");
  return u("div", {
    ...props,
    className: classes(["wishlist-wishlist", className]),
    children: [renderAlert, isLoading ? renderLoader() : renderWishlist()]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 176,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/ecornejo/Sites/storefront-wishlist/src/components/Login/Login.tsx";
const Login = ({
  onLoginClick
}) => {
  return u("div", {
    className: "wishlist-login__sign-in",
    children: [u("a", {
      "data-testid": "log-in-link",
      className: "wishlist-login__link",
      href: "",
      rel: "noreferrer",
      onClick: onLoginClick,
      role: "button",
      children: u(Text, {
        id: "Wishlist.Login.logIn"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 38,
        columnNumber: 9
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }, void 0), u(Text, {
      id: "Wishlist.Login.sync"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
export {
  Wishlist$1 as Wishlist,
  Wishlist$1 as default
};
//# sourceMappingURL=Wishlist.js.map
