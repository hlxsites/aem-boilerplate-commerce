/*! Copyright 2025 Adobe
All Rights Reserved. */
import { lazy, Suspense } from "@dropins/tools/preact-compat.js";
import { a as u } from "./jsxRuntime.module.js";
import { classes as classes$1, VComponent } from "@dropins/tools/lib.js";
const classes = (classes2) => {
  const result = classes2.reduce((result2, item) => {
    if (!item) return result2;
    if (typeof item === "string") result2 += ` ${item}`;
    if (Array.isArray(item)) {
      const [className, isActive] = item;
      if (className && isActive) {
        result2 += ` ${className}`;
      }
    }
    return result2;
  }, "");
  return result.trim();
};
const scriptRel = function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/components/Icon/Icon.tsx";
const lazyIcons = {
  Add: lazy(() => __vitePreload(() => import("./Add.js"), true ? [] : void 0)),
  Bulk: lazy(() => __vitePreload(() => import("./Bulk.js"), true ? [] : void 0)),
  Burger: lazy(() => __vitePreload(() => import("./Burger.js"), true ? [] : void 0)),
  Cart: lazy(() => __vitePreload(() => import("./Cart.js"), true ? [] : void 0)),
  Check: lazy(() => __vitePreload(() => import("./Check.js"), true ? [] : void 0)),
  ChevronDown: lazy(() => __vitePreload(() => import("./ChevronDown.js"), true ? [] : void 0)),
  ChevronUp: lazy(() => __vitePreload(() => import("./ChevronUp.js"), true ? [] : void 0)),
  ChevronRight: lazy(() => __vitePreload(() => import("./ChevronRight.js"), true ? [] : void 0)),
  Close: lazy(() => __vitePreload(() => import("./Close.js"), true ? [] : void 0)),
  Heart: lazy(() => __vitePreload(() => import("./Heart.js"), true ? [] : void 0)),
  Minus: lazy(() => __vitePreload(() => import("./Minus.js"), true ? [] : void 0)),
  Placeholder: lazy(() => __vitePreload(() => import("./Placeholder.js"), true ? [] : void 0)),
  PlaceholderFilled: lazy(() => __vitePreload(() => import("./PlaceholderFilled.js"), true ? [] : void 0)),
  Search: lazy(() => __vitePreload(() => import("./Search.js"), true ? [] : void 0)),
  SearchFilled: lazy(() => __vitePreload(() => import("./SearchFilled.js"), true ? [] : void 0)),
  Sort: lazy(() => __vitePreload(() => import("./Sort.js"), true ? [] : void 0)),
  Star: lazy(() => __vitePreload(() => import("./Star.js"), true ? [] : void 0)),
  View: lazy(() => __vitePreload(() => import("./View.js"), true ? [] : void 0)),
  User: lazy(() => __vitePreload(() => import("./User.js"), true ? [] : void 0)),
  Warning: lazy(() => __vitePreload(() => import("./Warning.js"), true ? [] : void 0)),
  Locker: lazy(() => __vitePreload(() => import("./Locker.js"), true ? [] : void 0)),
  Wallet: lazy(() => __vitePreload(() => import("./Wallet.js"), true ? [] : void 0)),
  Card: lazy(() => __vitePreload(() => import("./Card.js"), true ? [] : void 0)),
  Order: lazy(() => __vitePreload(() => import("./Order.js"), true ? [] : void 0)),
  Delivery: lazy(() => __vitePreload(() => import("./Delivery.js"), true ? [] : void 0)),
  OrderError: lazy(() => __vitePreload(() => import("./OrderError.js"), true ? [] : void 0)),
  OrderSuccess: lazy(() => __vitePreload(() => import("./OrderSuccess.js"), true ? [] : void 0)),
  PaymentError: lazy(() => __vitePreload(() => import("./PaymentError.js"), true ? [] : void 0)),
  CheckWithCircle: lazy(() => __vitePreload(() => import("./CheckWithCircle.js"), true ? [] : void 0)),
  WarningWithCircle: lazy(() => __vitePreload(() => import("./WarningWithCircle.js"), true ? [] : void 0)),
  WarningFilled: lazy(() => __vitePreload(() => import("./WarningFilled.js"), true ? [] : void 0)),
  InfoFilled: lazy(() => __vitePreload(() => import("./InfoFilled.js"), true ? [] : void 0)),
  HeartFilled: lazy(() => __vitePreload(() => import("./HeartFilled.js"), true ? [] : void 0)),
  Trash: lazy(() => __vitePreload(() => import("./Trash.js"), true ? [] : void 0)),
  Eye: lazy(() => __vitePreload(() => import("./Eye.js"), true ? [] : void 0)),
  EyeClose: lazy(() => __vitePreload(() => import("./EyeClose.js"), true ? [] : void 0)),
  Date: lazy(() => __vitePreload(() => import("./Date.js"), true ? [] : void 0)),
  AddressBook: lazy(() => __vitePreload(() => import("./AddressBook.js"), true ? [] : void 0)),
  EmptyBox: lazy(() => __vitePreload(() => import("./EmptyBox.js"), true ? [] : void 0)),
  Coupon: lazy(() => __vitePreload(() => import("./Coupon.js"), true ? [] : void 0)),
  Gift: lazy(() => __vitePreload(() => import("./Gift.js"), true ? [] : void 0)),
  GiftCard: lazy(() => __vitePreload(() => import("./GiftCard.js"), true ? [] : void 0))
};
function Icon({
  source: Source,
  size = "24",
  stroke = "2",
  viewBox = "0 0 24 24",
  className,
  ...props
}) {
  const LazyIcon = typeof Source === "string" ? lazyIcons[Source] : null;
  const defaultProps = {
    className: classes(["dropin-icon", `dropin-icon--shape-stroke-${stroke}`, className]),
    width: size,
    height: size,
    viewBox
  };
  return u(Suspense, {
    fallback: u("svg", {
      ...props,
      ...defaultProps
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 103,
      columnNumber: 25
    }, this),
    children: LazyIcon ? u(LazyIcon, {
      ...props,
      ...defaultProps
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 105,
      columnNumber: 9
    }, this) : (
      // @ts-ignore
      u(Source, {
        ...props,
        ...defaultProps
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 108,
        columnNumber: 9
      }, this)
    )
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 103,
    columnNumber: 5
  }, this);
}
var _jsxFileName = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/components/Button/Button.tsx";
const Button = ({
  value,
  variant = "primary",
  size = "medium",
  icon,
  className,
  children,
  disabled = false,
  active = false,
  activeChildren,
  activeIcon,
  href,
  ...props
}) => {
  let buttonType = "dropin-button";
  if (icon && !children || icon && active && !activeChildren || !icon && active && activeIcon) {
    buttonType = "dropin-iconButton";
  }
  if (active && activeChildren) {
    buttonType = "dropin-button";
  }
  className = classes$1([buttonType, `${buttonType}--${size}`, `${buttonType}--${variant}`, [`${buttonType}--${variant}--disabled`, disabled], children && icon && `${buttonType}--with-icon`, !children && activeChildren && icon && `${buttonType}--with-icon`, active && activeIcon && `${buttonType}--with-icon`, className]);
  const iconClassName = classes$1(["dropin-button-icon", `dropin-button-icon--${variant}`, [`dropin-button-icon--${variant}--disabled`, disabled], icon == null ? void 0 : icon.props.className]);
  const attributes = href ? {
    node: u("a", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 15
    }, void 0),
    role: "link",
    href,
    ...props,
    disabled,
    active,
    onKeyDown: (event) => {
      if (disabled) {
        event.preventDefault();
      }
    },
    tabIndex: disabled ? -1 : 0
  } : {
    node: u("button", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 15
    }, void 0),
    role: "button",
    ...props,
    value,
    disabled,
    active
  };
  return u(VComponent, {
    ...attributes,
    className,
    children: [icon && !active && u(VComponent, {
      node: icon,
      className: iconClassName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 27
    }, void 0), activeIcon && active && u(VComponent, {
      node: activeIcon,
      className: iconClassName
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 9
    }, void 0), children && !active && (typeof children === "string" ? u("span", {
      children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 41
    }, void 0) : children), active && activeChildren && (typeof activeChildren === "string" ? u("span", {
      children: activeChildren
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 11
    }, void 0) : activeChildren)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 101,
    columnNumber: 5
  }, void 0);
};
export {
  Button as B,
  Icon as I,
  classes as c
};
//# sourceMappingURL=Button.js.map
