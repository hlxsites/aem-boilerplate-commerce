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

const helderInitializers = (orderRef) => {
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
    let targetPath = null;
    if (currentUrl.pathname.includes(CUSTOMER_ORDERS_PATH)) {
      return;
    }

    // TEST
    events.on("order/error", ({ error }) => {
      const defaultErrorMessage =
        "We couldn't locate an order with the information provided.";

      if (error.includes(defaultErrorMessage)) {
        console.log("defaultErrorMessage", 1);
        window.location.href = `${ORDER_DETAILS_PATH}${ORDER_REF_URL_QUERY}`;
      } else if (isAuthenticated) {
        console.log("defaultErrorMessage", 2);
        window.location.href = `${CUSTOMER_ORDERS_PATH}`;
      } else {
        console.log("defaultErrorMessage", 3);
        window.location.href = `${ORDER_STATUS_PATH}`;
      }
    });

    if (isAuthenticated) {
      console.log("0", 0);
      if (!orderRef) {
        console.log("1", 1);
        targetPath = CUSTOMER_ORDERS_PATH;
      } else if (isAccountPage) {
        console.log("2", 2);
        if (isToken) {
          console.log("3", 3);
          targetPath = `${ORDER_DETAILS_PATH}${ORDER_REF_URL_QUERY}`;
        } else {
          console.log("4", 4);
          helderInitializers(orderRef);
        }
      } else if (isToken) {
        console.log("5", 5);
        helderInitializers(orderRef);
      } else {
        console.log("6", 6);
        targetPath = `${CUSTOMER_ORDER_DETAILS_PATH}${ORDER_REF_URL_QUERY}`;
      }
    } else if (!orderRef) {
      console.log("7", 7);
      targetPath = ORDER_STATUS_PATH;
    } else if (isToken) {
      console.log("8", 8);
      helderInitializers(orderRef);
    } else {
      console.log("9", 9);
      targetPath = `${ORDER_STATUS_PATH}${ORDER_REF_URL_QUERY}`;
    }

    if (targetPath) {
      console.log("targetPath", targetPath);
      window.test.push(targetPath);

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
