import { h } from '@dropins/tools/preact.js';
import { provider as UI, Icon, ActionButton } from '@dropins/tools/components.js';
import { getCustomerRolePermissions } from '@dropins/storefront-auth/api.js';

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
  const permissions = await getCustomerRolePermissions();

  /** Create items */
  $items.forEach(($item) => {
    /** Permission
     * Do not render if the user does not have the permission for this item
     * Default permission is 'all'
    */
    const permission = $item.querySelector(`:scope > div:nth-child(${rows.permission})`)?.textContent?.trim() || 'all';
    if (!permissions.admin && !permissions[permission]) {
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

  /** Toggle nav button */
  const $container = block.closest('.commerce-account-nav-container');

  if ($container && !$container.querySelector('.commerce-account-nav__collapse-button')) {
    const $collapseWrapper = document.createElement('div');

    const collapseButton = await UI.render(ActionButton, {
      className: 'commerce-account-nav__collapse-button',
      variant: 'secondary',
      size: 'small',
      icon: h(Icon, { source: 'Minus' }),
      children: 'Hide Menu',
      onClick: () => {
        $container.classList.toggle('commerce-account-nav-container--collapsed');
        collapseButton.setProps((prev) => ({ 
          ...prev, 
          children: prev.children === 'Show Menu' ? 'Hide Menu' : 'Show Menu',
          icon: h(Icon, { 
            source: prev.icon.props.source === 'Add' ? 'Minus' : 'Add',
          }),
        }));
      },
    })($collapseWrapper);

    $container.prepend($collapseWrapper);
  }

  block.replaceWith($nav);
}

