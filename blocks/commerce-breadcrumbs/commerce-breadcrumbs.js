import { Breadcrumbs, provider as UI } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';

import { rootLink } from '../../scripts/commerce.js';

const SESSION_KEY = 'commerce.breadcrumbs';

/**
 * Parses the authored `<ol>` / `<ul>` into a flat list of `{ label, url }`.
 * `url` is the `<a>` pathname when present, otherwise `null`.
 *
 * Position determines the leaf: the last `<li>` is
 * always rendered as the current page (plain text). The author provides
 * every crumb (including `Home`).
 */
function parseCrumbs(block) {
  const list = block.querySelector('ol, ul');
  if (!list) return [];
  return [...list.querySelectorAll(':scope > li')].map((li) => {
    const anchor = li.querySelector('a');
    return {
      label: (anchor || li).textContent.trim(),
      url: anchor ? new URL(anchor.href).pathname : null,
    };
  });
}

export default function decorate(block) {
  const crumbs = parseCrumbs(block);
  block.innerHTML = '';
  if (crumbs.length === 0) return;

  const currentPath = window.location.pathname;
  const leaf = crumbs[crumbs.length - 1];
  let ancestors = crumbs.slice(0, -1);

  // Session override: when arriving from a PLP, use the propagated trail
  // instead of whatever the author put in the HTML.
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (raw) {
    try {
      const session = JSON.parse(raw);
      if (session.path === currentPath) ancestors = session.trail;
    } catch (error) {
      sessionStorage.removeItem(SESSION_KEY);
      throw new Error(`Malformed ${SESSION_KEY} in sessionStorage: ${error.message}`);
    }
  }

  UI.render(Breadcrumbs, {
    categories: [
      ...ancestors.map((item) => (item.url
        ? h('a', { href: rootLink(item.url) }, item.label)
        : h('span', null, item.label))),
      h('span', null, leaf.label),
    ],
  })(block);

  // Propagate the full breadcrumb (ancestors + current page) on product link
  // clicks so the destination PDP can render the user's actual path.
  const propagatedTrail = [...ancestors, { label: leaf.label, url: currentPath }];

  document.querySelector('main .product-list-page')?.addEventListener('click', (event) => {
    const anchor = event.target.closest('a');
    if (!anchor) return;
    const targetPath = new URL(anchor.href).pathname;
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ path: targetPath, trail: propagatedTrail }),
    );
  });
}
