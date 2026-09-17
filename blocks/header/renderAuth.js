import { getCookie } from '@dropins/tools/lib.js';
import { events } from '@dropins/tools/event-bus.js';
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  rootLink,
  getProductLink,
} from '../../scripts/commerce.js';

// ─── Shared helpers ──────────────────────────────────────────────────────────

function handleLogout(redirections) {
  const shouldRedirect = Object.entries(redirections).some(([path, dest]) => {
    if (window.location.pathname.includes(path)) {
      window.location.href = dest;
      return true;
    }
    return false;
  });
  if (!shouldRedirect) window.location.reload();
}

// ─── Auth Dropdown ───────────────────────────────────────────────────────────
// Appends a sign-in button + panel to the nav tools area.
// The SignIn dropin is fetched lazily the first time the panel opens.

function renderAuthDropdown(navTools) {
  navTools.insertAdjacentHTML('beforeend', `
    <div class="dropdown-wrapper nav-tools-wrapper">
      <button type="button" class="nav-dropdown-button"
        aria-haspopup="dialog" aria-expanded="false" aria-controls="login-modal">
      </button>
      <div class="nav-auth-menu-panel nav-tools-panel">
        <div id="auth-dropin-container"></div>
        <ul class="authenticated-user-menu">
          <li><a href="${rootLink('/customer/account')}">My Account</a></li>
          <li><button>Logout</button></li>
        </ul>
      </div>
    </div>`);

  const panel = navTools.querySelector('.nav-auth-menu-panel');
  const menuList = navTools.querySelector('.authenticated-user-menu');
  const dropinContainer = navTools.querySelector('#auth-dropin-container');
  const loginButton = navTools.querySelector('.nav-dropdown-button');
  const logoutButton = navTools.querySelector('.authenticated-user-menu > li > button');

  // Prevent clicks inside the panel from bubbling to the document close-handler.
  panel.addEventListener('click', (e) => e.stopPropagation());

  // Lazy-load the SignIn dropin once, on first panel open.
  let signInLoaded = false;
  async function loadSignIn() {
    if (signInLoaded) return;
    signInLoaded = true;
    const [{ render }, { SignIn }] = await Promise.all([
      import('@dropins/storefront-auth/render.js'),
      import('@dropins/storefront-auth/containers/SignIn.js'),
    ]);
    render.render(SignIn, {
      onSuccessCallback: () => window.location.reload(),
      formSize: 'small',
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
    })(dropinContainer);
  }

  async function togglePanel(state) {
    const show = state ?? !panel.classList.contains('nav-tools-panel--show');
    if (show) await loadSignIn();
    panel.classList.toggle('nav-tools-panel--show', show);
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-hidden', String(!show));
    panel.setAttribute('aria-labelledby', 'modal-title');
    panel.setAttribute('aria-describedby', 'modal-description');
    loginButton.setAttribute('aria-expanded', show ? 'true' : 'false');
    if (show) panel.focus();
  }

  loginButton.addEventListener('click', () => togglePanel());

  // Close when clicking outside the panel.
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !loginButton.contains(e.target)) {
      togglePanel(false);
    }
  });

  // Logout — authApi is fetched on demand since the user may be authenticated
  // via cookie without ever having opened the dropdown (so loadSignIn may not
  // have run yet).
  logoutButton.addEventListener('click', async () => {
    const { revokeCustomerToken } = await import('@dropins/storefront-auth/api.js');
    await revokeCustomerToken();
    handleLogout({
      '/checkout': rootLink('/cart'),
      '/customer': rootLink('/customer/login'),
      '/order-details': rootLink('/'),
    });
  });

  // Reflect the current auth state immediately from cookies, with no dropin needed.
  const tokenCookie = getCookie('auth_dropin_user_token');
  const nameCookie = getCookie('auth_dropin_firstname');
  if (tokenCookie) {
    menuList.style.display = 'block';
    dropinContainer.style.display = 'none';
    loginButton.textContent = `Hi, ${nameCookie}`;
  } else {
    menuList.style.display = 'none';
    dropinContainer.style.display = 'block';
    loginButton.innerHTML = `
      <svg width="25" height="25" viewBox="0 0 24 24" aria-label="My Account">
        <g fill="none" stroke="#000000" stroke-width="1.5">
          <circle cx="12" cy="6" r="4"></circle>
          <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z">
          </path>
        </g>
      </svg>`;
  }
}

// ─── Auth Combine (mobile nav modal) ─────────────────────────────────────────
// Finds the "Account" link in the mobile nav and converts it into a button
// that opens a full-page modal. AuthCombine (sign-in + sign-up + reset
// password) is fetched lazily only when the user clicks that button.

async function openAuthModal(triggerElement) {
  // If already signed in, go directly to the account page.
  if (getCookie('auth_dropin_firstname')) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

  // Build the modal shell synchronously so it appears immediately.
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  const originalViewport = viewportMeta.getAttribute('content');
  viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
  document.body.style.overflow = 'hidden';

  const modal = document.createElement('div');
  modal.id = 'auth-combine-modal';
  modal.classList.add('auth-combine-modal-overlay');

  const form = document.createElement('div');
  form.id = 'auth-combine-wrapper';
  form.addEventListener('click', (e) => e.stopPropagation());
  modal.appendChild(form);

  // Close modal on backdrop click or Escape.
  function closeModal() {
    modal.remove();
    document.body.style.overflow = 'auto';
    viewportMeta.setAttribute('content', originalViewport);
    window.removeEventListener('keydown', trapFocus);
    window.location.reload();
  }

  modal.addEventListener('click', closeModal);

  function trapFocus(e) {
    const key = e.key.toLowerCase();
    if (key === 'escape') {
      e.preventDefault();
      closeModal();
      triggerElement?.focus();
      return;
    }
    const focusable = modal.querySelectorAll(
      'input[name="email"], input, button, textarea, select, a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!modal.dataset.focusInitialized) {
      modal.dataset.focusInitialized = 'true';
      requestAnimationFrame(() => first.focus());
    }
    if (key === 'tab' && e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (key === 'tab' && !e.shiftKey
      && (document.activeElement === last || document.activeElement === modal)) {
      e.preventDefault();
      first.focus();
    }
  }

  window.addEventListener('keydown', trapFocus);
  document.body.appendChild(modal);

  // Fetch dropin modules only now that the user has requested them.
  const [
    { render: authRenderer },
    { AuthCombine },
    { SuccessNotification },
    authApi,
    { Button, provider: UI },
  ] = await Promise.all([
    import('@dropins/storefront-auth/render.js'),
    import('@dropins/storefront-auth/containers/AuthCombine.js'),
    import('@dropins/storefront-auth/containers/SuccessNotification.js'),
    import('@dropins/storefront-auth/api.js'),
    import('@dropins/tools/components.js'),
  ]);

  // Success notification shared between sign-in and sign-up flows.
  function renderSuccessNotification(ctx, { heading, message, actions }) {
    const wrapper = document.createElement('div');
    authRenderer.render(SuccessNotification, {
      labels: { headingText: heading, messageText: message },
      slots: {
        SuccessNotificationActions: (innerCtx) => {
          actions.forEach(({ label, variant, onClick }) => {
            const btn = document.createElement('div');
            if (variant !== 'primary') {
              btn.style.cssText = 'display:flex;justify-content:center;margin-top:var(--spacing-xsmall)';
            }
            UI.render(Button, { children: label, variant, onClick })(btn);
            innerCtx.appendChild(btn);
          });
        },
      },
    })(wrapper);
    ctx.appendChild(wrapper);
  }

  const signInFormConfig = {
    renderSignUpLink: true,
    routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
    slots: {
      SuccessNotification: (ctx) => {
        const userName = ctx?.isSuccessful?.userName || '';
        renderSuccessNotification(ctx, {
          heading: `Welcome ${userName}!`,
          message: 'You have successfully logged in.',
          actions: [
            { label: 'My Account', variant: 'primary', onClick: () => { window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH); } },
            { label: 'Logout', variant: 'tertiary', onClick: async () => { await authApi.revokeCustomerToken(); window.location.href = rootLink('/'); } },
          ],
        });
      },
    },
  };

  const signUpFormConfig = {
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
    routeRedirectOnSignIn: () => rootLink(CUSTOMER_ACCOUNT_PATH),
    isAutoSignInEnabled: false,
    slots: {
      SuccessNotification: (ctx) => {
        renderSuccessNotification(ctx, {
          heading: 'Your account has been successfully created!',
          message: 'You can login using sign-in page now.',
          actions: [
            { label: 'Sign in', variant: 'primary', onClick: () => { window.location.href = rootLink(CUSTOMER_LOGIN_PATH); } },
            { label: 'Home', variant: 'tertiary', onClick: () => { window.location.href = rootLink('/'); } },
          ],
        });
      },
    },
  };

  const resetPasswordFormConfig = {
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
  };

  authRenderer.render(AuthCombine, {
    signInFormConfig,
    signUpFormConfig,
    resetPasswordFormConfig,
  })(form);
}

function renderAuthCombine(navSections, closeMenu) {
  // Guests only — authenticated users go directly to their account page on click.
  if (getCookie('auth_dropin_firstname')) return;

  const listItems = navSections.querySelectorAll('.default-content-wrapper > ul > li');
  const accountLi = Array.from(listItems).find((li) => li.textContent.includes('Account'));
  if (!accountLi) return;

  const subItems = accountLi.querySelectorAll('ul > li');
  const authLink = subItems[subItems.length - 1];
  if (!authLink) return;

  // Replace the plain nav link with an accessible button.
  authLink.classList.add('authCombineNavElement');
  authLink.innerHTML = `<button type="button">${authLink.textContent}</button>`;

  authLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openAuthModal(accountLi);

    // Update nav UI once the user authenticates inside the modal.
    events.on('authenticated', (isAuthenticated) => {
      if (!isAuthenticated) return;
      const headerLoginButton = document.querySelector('#header-login-button');
      const popupElement = document.querySelector('#popup-menu');
      const popupMenuContainer = document.querySelector('.popupMenuContainer');
      const authCombineNavElement = document.querySelector('.authCombineNavElement');
      if (!authCombineNavElement || !headerLoginButton || !popupElement || !popupMenuContainer) {
        return;
      }

      authCombineNavElement.style.display = 'none';
      popupMenuContainer.innerHTML = '';
      popupElement.style.minWidth = '250px';
      headerLoginButton.querySelector('span').textContent = `Hi, ${getCookie('auth_dropin_firstname')}`;
      popupMenuContainer.insertAdjacentHTML('afterend', `
        <ul class="popupMenuUrlList">
          <li><a href="${rootLink(CUSTOMER_ACCOUNT_PATH)}">My Account</a></li>
          <li><a href="${getProductLink('hollister-backyard-sweatshirt', 'MH05')}">Product page</a></li>
          <li><button class="logoutButton">Logout</button></li>
        </ul>`);
    });

    closeMenu?.();
  });
}

// ─── Entry point ─────────────────────────────────────────────────────────────
// Call renderAuth(nav, closeMenu) from the header block.
// Delete the import in header.js to remove all auth from the header.

export default function renderAuth(nav, closeMenu) {
  const navSections = nav.querySelector('.nav-sections');
  const navTools = nav.querySelector('.nav-tools');
  if (navSections) renderAuthCombine(navSections, closeMenu);
  if (navTools) renderAuthDropdown(navTools);
}
