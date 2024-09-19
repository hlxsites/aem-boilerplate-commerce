/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { SignIn } from "@dropins/storefront-auth/containers/SignIn.js";
import { OrderSearch } from "@dropins/storefront-order/containers/OrderSearch.js";
import { render as authRenderer } from "@dropins/storefront-auth/render.js";
import { render as orderRenderer } from "@dropins/storefront-order/render.js";
import { getCookie } from "../../scripts/configs.js";

const renderSignIn = async (element, email, orderNumber) =>
  authRenderer.render(SignIn, {
    initialEmailValue: email,
    renderSignUpLink: false,
    labels: {
      formTitleText: email
        ? "Enter your password to view order details"
        : "Sign in to view order details",
      primaryButtonText: "View order",
    },
    routeForgotPassword: () => "reset-password.html",
    routeRedirectOnSignIn: () =>
      `/customer/order-details?orderRef=${orderNumber}`,
  })(element);

function disableCacheForPage() {
  const metaCacheControl = document.createElement("meta");
  metaCacheControl.httpEquiv = "Cache-Control";
  metaCacheControl.content = "no-cache, no-store, must-revalidate";

  const metaPragma = document.createElement("meta");
  metaPragma.httpEquiv = "Pragma";
  metaPragma.content = "no-cache";

  const metaExpires = document.createElement("meta");
  metaExpires.httpEquiv = "Expires";
  metaExpires.content = "0";

  document.head.appendChild(metaCacheControl);
  document.head.appendChild(metaPragma);
  document.head.appendChild(metaExpires);
}

disableCacheForPage();

const handleBeforeUnload = () => {
  window.location.reload();
};

window.addEventListener("beforeunload", handleBeforeUnload);

window.removeEventListener("beforeunload", handleBeforeUnload);

export default async function decorate(block) {
  block.innerHTML = "";

  const isAuthenticated = !!getCookie("auth_dropin_user_token") || false;

  await orderRenderer.render(OrderSearch, {
    isAuth: isAuthenticated,
    renderSignIn: async ({ render, formValues }) => {
      if (render) {
        renderSignIn(block, formValues?.email ?? "", formValues?.number ?? "");

        return false;
      }

      return true;
    },
    routeCustomerOrder: () => "/customer/order-details",
    routeGuestOrder: () => "/order-details",
    onError: async (errorInformation) => {
      console.info("errorInformation", errorInformation);
    },
  })(block);
}
