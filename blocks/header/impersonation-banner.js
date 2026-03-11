import { getCookie } from "@dropins/tools/lib.js";
import * as authApi from "@dropins/storefront-auth/api.js";
import { events } from "@dropins/tools/event-bus.js";

const ADMIN_SESSION_COOKIE = "auth_dropin_admin_session";

/**
 * Creates and manages the impersonation banner for Seller Assisted Buying sessions
 * @returns {HTMLElement|null} The banner element or null if not in admin session
 */
export default function createImpersonationBanner() {
  // Check if admin session exists
  const isAdminSession = getCookie(ADMIN_SESSION_COOKIE);

  if (!isAdminSession) {
    return null;
  }

  // Get customer information from cookies
  const customerName = getCookie("auth_dropin_firstname") || "Customer";
  const websiteName = "Main Website";

  // Create banner element
  const banner = document.createElement("div");
  banner.className = "impersonation-banner";

  // Create message section
  const message = document.createElement("div");
  message.className = "impersonation-banner__message";
  message.textContent = `You are connected as ${customerName} on ${websiteName}`;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.className = "impersonation-banner__close-button";
  closeButton.textContent = "Close Session";
  closeButton.type = "button";

  // Handle close session
  closeButton.addEventListener("click", async () => {
    try {
      // Disable button during logout
      closeButton.disabled = true;
      closeButton.textContent = "Closing...";

      // Use regular logout mutation
      await authApi.revokeCustomerToken();

      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error closing impersonation session:", error);
      closeButton.disabled = false;
      closeButton.textContent = "Close Session";
    }
  });

  // Assemble banner
  banner.appendChild(message);
  banner.appendChild(closeButton);

  // Listen to authentication changes to remove banner if session ends
  events.on("authenticated", (isAuthenticated) => {
    if (!isAuthenticated || !getCookie(ADMIN_SESSION_COOKIE)) {
      banner.remove();
    }
  });

  return banner;
}
