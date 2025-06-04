/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { ResetPassword } from "@dropins/storefront-auth/containers/ResetPassword.js";
import { render as authRenderer } from "@dropins/storefront-auth/render.js";
import { events } from "@dropins/tools/event-bus.js";
import { checkIsAuthenticated } from "../../scripts/configs.js";
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
} from "../../scripts/constants.js";
import { rootLink } from "../../scripts/scripts.js";

// Block-level
import createModal from "../modal/modal.js";

// Initialize
import "../../scripts/initializers/auth.js";

let modal = null;

const showConfirmationModal = async () => {
  const content = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = "Check your email";

  const message = document.createElement("p");
  message.textContent =
    "If there is an account associated with this email, you will receive a link to reset your password.";

  content.append(title, message);

  modal = await createModal([content]);
  modal.showModal();
};

export default async function decorate(block) {
  if (checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  } else {
    await authRenderer.render(ResetPassword, {
      routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
      onSuccessCallback: () => {
        showConfirmationModal();
      },
      onErrorCallback: (error) => {
        console.log("error :>> ", error);
      },
    })(block);
  }

  events.on("authenticated", (authenticated) => {
    if (authenticated) window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
  });
}
