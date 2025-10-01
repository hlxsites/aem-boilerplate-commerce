import { provider as UI, Icon } from '@dropins/tools/components.js';
import { fetchGraphQl } from '@dropins/storefront-auth/api.js';
import { GET_CUSTOMER_ROLE_PERMISSIONS } from './graphql.js';

import '../../scripts/initializers/auth.js';

export default async function decorate(block) {
  /** Get rows data */
  const [keys, ...$items] = [...block.children].map((child, index) => {
    if (index === 0) return [...child.children].map((c) => c.textContent.trim());
    return child;
  });

  /** Create nav */
  const $nav = document.createElement('div');
  $nav.classList.add('commerce-account-nav');

  /** Get rows indexes */
  const rows = {
    label: Math.max(0, keys.indexOf('label') + 1),
    icon: Math.max(0, keys.indexOf('icon') + 1),
    permission: Math.max(0, keys.indexOf('permission') + 1),
  };

  /** Get permissions */
  const permissions = await getUserPermissions();

  /** Create items */
  $items.forEach(($item, index) => {
    /** Permission
     * Do not render if the user does not have the permission for this item
     * Default permission is 'all'
    */
    const permission = $item.querySelector(`:scope > div:nth-child(${rows.permission})`)?.textContent?.trim() || 'all';
    if (!permissions[permission]) {
      return;
    }

    /** Template */
    const template = document.createRange().createContextualFragment(`
      <a class="commerce-account-nav__item">
        <span class="commerce-account-nav__item__icon"></span>
        <span class="commerce-account-nav__item__title"></span>
        <span class="commerce-account-nav__item__description"></span>
        <span class="commerce-account-nav__item__chevron" aria-hidden="true"></span>
      </a>
    `);

    const $link = template.querySelector('.commerce-account-nav__item');
    const $icon = template.querySelector('.commerce-account-nav__item__icon');
    const $title = template.querySelector('.commerce-account-nav__item__title');
    const $description = template.querySelector('.commerce-account-nav__item__description');

    /** Content */
    const $content = $item.querySelector(`:scope > div:nth-child(${rows.label})`)?.children;

    /** Link */
    const link = $content[0]?.querySelector('a')?.href;
    const isActive = link && new URL(link).pathname === window.location.pathname;
    $link.classList.toggle('commerce-account-nav__item--active', isActive);
    $link.href = link;

    /** Icon */
    const icon = $item.querySelector(`:scope > div:nth-child(${rows.icon})`)?.textContent?.trim();

    if (icon) {
      UI.render(Icon, { source: icon, size: 24 })($icon);
    }

    /** Title */
    $title.textContent = $content[0]?.textContent || '';

    /** Description */
    $description.textContent = $content[1]?.textContent || '';

    /** Chevron Icon */
    // UI.render(Icon, { source: 'ChevronRight', size: 24 })($chevron);

    /** Add link to nav */
    $nav.appendChild($link);
  });

  block.replaceWith($nav);
}

async function getUserPermissions() {
  const PERMISSIONS_CACHE_KEY = 'commerce-account-nav-permissions';

  // Helper function to flatten permissions
  const flattenPermissions = (userPermissions) => {
    const flattenedPermissions = {
      all: true,
    };

    if (userPermissions) {
      const flatten = (perms) => {
        perms.forEach((perm) => {
          flattenedPermissions[perm.text] = true;
          if (perm.children) {
            flatten(perm.children);
          }
        });
      };
      flatten(userPermissions);
    }

    return flattenedPermissions;
  };

  // Helper function to fetch and cache permissions
  const fetchAndCachePermissions = async () => {
    const res = await fetchGraphQl(GET_CUSTOMER_ROLE_PERMISSIONS, { method: 'GET' });
    const userPermissions = res.data?.customer?.role?.permissions;
    const flattenedPermissions = flattenPermissions(userPermissions);

    // Cache flattened permissions in session storage
    try {
      sessionStorage.setItem(PERMISSIONS_CACHE_KEY, JSON.stringify(flattenedPermissions));
    } catch (error) {
      // Ignore session storage errors (e.g., quota exceeded)
      console.warn('Failed to cache permissions in session storage:', error);
    }

    return flattenedPermissions;
  };

  // Check session storage for cached flattened permissions
  try {
    const cached = sessionStorage.getItem(PERMISSIONS_CACHE_KEY);

    if (cached) {
      const cachedPermissions = JSON.parse(cached);

      // Return cached data immediately,
      // but also start background revalidation if not already started
      if (!window.__fetchingUserPermissions) {
        window.__fetchingUserPermissions = fetchAndCachePermissions()
          .catch((error) => {
            // Silently fail background refetch - we already have cached data
            console.warn('Background permissions fetch failed:', error);
          });
      }

      return cachedPermissions;
    }
  } catch (error) {
    // Ignore session storage errors (e.g., in private browsing)
    console.warn('Failed to read from session storage:', error);
  }

  // No cached data available, fetch immediately
  if (!window.__fetchingUserPermissions) {
    window.__fetchingUserPermissions = fetchAndCachePermissions();
  }

  return window.__fetchingUserPermissions;
}
