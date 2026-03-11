import { render as accountRenderer } from "@dropins/storefront-account/render.js";
import { SellerAssistedPurchasing } from "@dropins/storefront-account/containers/SellerAssistedPurchasing.js";
// Initialize
import "../../scripts/initializers/account.js";

export default async function decorate(block) {
  const container = document.createElement("div");

  await accountRenderer.render(SellerAssistedPurchasing, {})(container);

  block.append(container);
}
