/* eslint-disable import/no-unresolved */

// Drop-in Tools
import { events } from "@dropins/tools/event-bus.js";
import {
  removeFetchGraphQlHeader,
  setEndpoint,
  setFetchGraphQlHeader,
} from "@dropins/tools/fetch-graphql.js";
import { initializers, Initializer } from "@dropins/tools/initializer.js";

// Drop-ins
import * as authApi from "@dropins/storefront-auth/api.js";
import * as cartApi from "@dropins/storefront-cart/api.js";
import * as orderApi from "@dropins/storefront-order/api.js";

// Recaptcha
import * as recaptcha from "@dropins/tools/recaptcha.js";

// Libs
import { getConfigValue, getCookie } from "./configs.js";
import { getMetadata } from "./aem.js";

export const getUserTokenCookie = () => getCookie("auth_dropin_user_token");

const setupInitialHandlers = (orderRef) => {
  console.log("orderRef", orderRef);
  initializers.register(orderApi.initialize, {
    orderRef,
  });
};

const redirectTo = (path) => {
  window.location.href = path;
};

const handleUserOrdersRedirects = () => {
  // Get current page template metadata
  const currentUrl = new URL(window.location.href);
  const templateMeta = getMetadata("template");
  const isOrderPage = templateMeta.includes("Order");
  const isAccountPage = currentUrl.pathname.includes("/customer");
  const isAuthenticated = !!getCookie("auth_dropin_user_token") ?? false;

  const orderRef = currentUrl.searchParams.get("orderRef");
  const isToken = orderRef && orderRef.length > 20 ? orderRef : null;

  const ORDER_STATUS_PATH = "/order-status";
  const ORDER_DETAILS_PATH = "/order-details";
  const CUSTOMER_ORDER_DETAILS_PATH = "/customer/order-details";
  const CUSTOMER_ORDERS_PATH = "/customer/orders";
  const ORDER_REF_URL_QUERY = `?orderRef=${orderRef}`;

  if (isOrderPage) {
    console.log("top");
    console.log("isOrderPage", isOrderPage);
    let targetPath = null;
    if (currentUrl.pathname.includes(CUSTOMER_ORDERS_PATH)) {
      return;
    }

    events.on("order/error", ({ error }) => {
      const defaultErrorMessage =
        "We couldn't locate an order with the information provided.";

      console.log("error", error);

      if (error.includes(defaultErrorMessage)) {
        window.location.href = `${ORDER_STATUS_PATH}`;
      } else if (isAuthenticated) {
        window.location.href = `${CUSTOMER_ORDERS_PATH}`;
      } else {
        window.location.href = `${ORDER_STATUS_PATH}`;
      }
    });

    if (isAuthenticated) {
      if (!orderRef) {
        targetPath = CUSTOMER_ORDERS_PATH;
      } else if (isAccountPage) {
        if (isToken) {
          targetPath = `${ORDER_DETAILS_PATH}${ORDER_REF_URL_QUERY}`;
        } else {
          setupInitialHandlers(orderRef);
        }
      } else if (isToken) {
        setupInitialHandlers(orderRef);
      } else {
        targetPath = `${CUSTOMER_ORDER_DETAILS_PATH}${ORDER_REF_URL_QUERY}`;
      }
    } else {
      if (!orderRef) {
        targetPath = `${ORDER_STATUS_PATH}`;
      } else {
        if (isToken) {
          setupInitialHandlers(orderRef);
        } else {
          targetPath = `${ORDER_STATUS_PATH}${ORDER_REF_URL_QUERY}`;
        }
      }
    }

    if (targetPath) {
      redirectTo(targetPath);
    }
  }
};

// Update auth headers
const setAuthHeaders = (state) => {
  if (state) {
    const token = getUserTokenCookie();
    setFetchGraphQlHeader("Authorization", `Bearer ${token}`);
  } else {
    removeFetchGraphQlHeader("Authorization");
  }
};

const persistCartDataInSession = (data) => {
  if (data?.id) {
    sessionStorage.setItem("DROPINS_CART_ID", data.id);
  } else {
    sessionStorage.removeItem("DROPINS_CART_ID");
  }
};

const initialize = new Initializer({
  init: () => {
    // on page load, check if user is authenticated
    const token = getUserTokenCookie();
    // set auth headers
    setAuthHeaders(!!token);
    // emit authenticated event if token has changed
    events.emit("authenticated", !!token);
  },
  listeners: () => [
    // Set auth headers on authenticated event
    events.on("authenticated", setAuthHeaders),
    // Cache cart data in session storage
    events.on("cart/data", persistCartDataInSession, { eager: true }),
  ],
});

export default async function initializeDropins() {
  // Register Initializers (Global)
  initializers.register(initialize, {});
  initializers.register(authApi.initialize, {});
  initializers.register(cartApi.initialize, {});

  handleUserOrdersRedirects();

  const mount = async () => {
    // Event Bus Logger
    events.enableLogger(true);
    // Set Fetch Endpoint (Global)
    setEndpoint(await getConfigValue("commerce-core-endpoint"));
    // Recaptcha
    recaptcha.setConfig();
    // Mount all registered drop-ins
    initializers.mount();
  };

  // Mount Drop-ins
  window.addEventListener("pageshow", mount);
  document.addEventListener("prerenderingchange", mount);
}
