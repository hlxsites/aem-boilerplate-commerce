import { provider as UI, Icon } from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';
import { COMPANY_ADDRESS_PERMISSIONS } from '@dropins/storefront-account/api.js';

import '../../scripts/initializers/auth.js';
import { isCompanyAddressBookEnabled } from '../../scripts/initializers/account.js';
import { CUSTOMER_ADDRESS_PATH } from '../../scripts/commerce.js';

/**
 * Synthetic permission key, not a backend ACL id. An authored row can use it in
 * its `permission` column to disappear once the company address book takes over,
 * which the customer's own permissions cannot express. Hidden for admins too,
 * because `=== false` is checked before the admin bypass.
 */
const COMPANY_ADDRESS_BOOK_DISABLED = 'company_address_book_disabled';

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

  const COMPANY_ADDRESS_ACL = new Set(Object.values(COMPANY_ADDRESS_PERMISSIONS));

  const readPermission = ($item) => $item
    .querySelector(`:scope > div:nth-child(${rows.permission})`)?.textContent?.trim() || 'all';

  const readHref = ($item) => $item
    .querySelector(`:scope > div:nth-child(${rows.label})`)?.children[0]?.querySelector('a')?.href;

  /**
   * Pages an authored row guards with a company address ACL. Once the address
   * book is on, any OTHER row pointing at the same page is the personal entry it
   * replaces. Read from the content so it survives translation and re-routing.
   */
  const companyAddressHrefs = new Set(
    $items
      .filter(($item) => COMPANY_ADDRESS_ACL.has(readPermission($item)))
      .map(readHref)
      .filter(Boolean),
  );

  /**
   * Matched on the path, not the permission: the boilerplate's default row
   * guards the addresses page with `all`, so the row itself says nothing about
   * being address-related. `endsWith` so a store root prefix matches too.
   */
  const pointsAtAddressesPage = ($item) => {
    const href = readHref($item);
    if (!href) return false;
    return new URL(href).pathname.replace(/\/$/, '').endsWith(CUSTOMER_ADDRESS_PATH);
  };

  // Awaited before subscribing so the handler stays synchronous: awaiting inside
  // it would let `block.replaceWith($nav)` run against a still-empty nav, and let
  // two firings of `auth/permissions` race with the slower one winning.
  const addressBookEnabled = await isCompanyAddressBookEnabled();

  /** Get permissions */
  events.on('auth/permissions', (permissions) => {
    // Copy, never mutate: the event bus replays the drop-in's own cached object
    // by reference, so writing to it would leak into every other consumer.
    const resolvedPermissions = {
      ...permissions,
      [COMPANY_ADDRESS_BOOK_DISABLED]: !addressBookEnabled,
      // The company address ACLs come from the role and arrive whether or not
      // the company uses an address book, so on their own they would show the
      // company entry to a company that has the feature off.
      ...(addressBookEnabled
        ? {}
        : Object.fromEntries(
          Object.values(COMPANY_ADDRESS_PERMISSIONS).map((id) => [id, false]),
        )),
    };

    // With the book on, that page needs the view ACL — without it the page
    // redirects the customer away, so offering a route to it is misleading.
    // Rows an author guarded with a company ACL are already dropped below; this
    // covers the default row, guarded by `all`, which survives every other rule.
    const canViewCompanyAddresses = Boolean(
      resolvedPermissions.admin
      || resolvedPermissions[COMPANY_ADDRESS_PERMISSIONS.VIEW],
    );

    /** Clear nav */
    $nav.innerHTML = '';

    /** Create items */
    $items.forEach(($item) => {
      /** Permissions. Default is 'all'; an explicit false hides the item even
       * for admins. */
      const permission = $item.querySelector(`:scope > div:nth-child(${rows.permission})`)?.textContent?.trim() || 'all';

      // Superseded by a company address row pointing at the same page.
      if (
        addressBookEnabled
        && !COMPANY_ADDRESS_ACL.has(permission)
        && companyAddressHrefs.has(readHref($item))
      ) {
        return;
      }

      // Leads to the company address book, which this customer may not view.
      if (addressBookEnabled && !canViewCompanyAddresses && pointsAtAddressesPage($item)) {
        return;
      }

      // Skip if permission is explicitly disabled (false)
      if (resolvedPermissions[permission] === false) {
        return;
      }

      // Skip if the user is not an admin and permission is not granted
      if (!resolvedPermissions.admin && !resolvedPermissions[permission]) {
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
        $link.classList.add('commerce-account-nav__item--has-icon');
        UI.render(Icon, { source: icon, size: 24 })($icon);
      }

      /** Title */
      $title.textContent = $content[0]?.textContent || '';

      /** Description */
      $description.textContent = $content[1]?.textContent || '';

      /** Add link to nav */
      $nav.appendChild($link);
    });
  }, { eager: true });

  block.replaceWith($nav);
}
