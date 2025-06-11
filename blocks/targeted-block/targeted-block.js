import { TargetedBlock } from "@dropins/storefront-personalization/containers";
import { render } from '@dropins/storefront-personalization/render.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Initializers
import '../../scripts/initializers/personalization.js';


export default async function decorate(block) {
  const blockConfig = readBlockConfig(block);

  const {
    fragment,
    type,
    'customer-segments': customerSegments,
    'customer-groups': customerGroups,
    'cart-rules': cartRules,
  } = blockConfig;

  const content = (blockConfig.fragment !== undefined)
    ? await loadFragment(fragment)
    : block.innerHTML;

  render.render(TargetedBlock, {
    type,
    personalizationData: {
      segments: customerSegments.split(',').map((num) => btoa(num.trim())),
      groups: customerGroups.split(',').map((num) => btoa(num.trim())),
      cartRules: cartRules.split(',').map((num) => btoa(num.trim())),
    },
    slots: {
      Content: (ctx) => {
        ctx.replaceWith(content);
      }
    }
  })(block);
}