import { getCookie } from '@dropins/tools/lib.js';
import {
  CUSTOMER_LOGIN_PATH,
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  rootLink,
} from '../../scripts/commerce.js';

// ─── Auth Dropdown — dropin initializer ─────────────────────────────────────
// Called lazily the first time an unauthenticated user opens the auth panel.

export async function initSignIn(container) {
  const [{ render }, { SignIn }] = await Promise.all([
    import('@dropins/storefront-auth/render.js'),
    import('@dropins/storefront-auth/containers/SignIn.js'),
  ]);
  render.render(SignIn, {
    onSuccessCallback: () => window.location.reload(),
    formSize: 'small',
    routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
  })(container);
}

// ─── Auth Modal (mobile nav) ─────────────────────────────────────────────────
// Called lazily when the user clicks the Account nav item on mobile.

export async function openAuthModal(triggerElement) {
  if (getCookie('auth_dropin_firstname')) {
    window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH);
    return;
  }

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
            {
              label: 'My Account',
              variant: 'primary',
              onClick: () => { window.location.href = rootLink(CUSTOMER_ACCOUNT_PATH); },
            },
            {
              label: 'Logout',
              variant: 'tertiary',
              onClick: async () => {
                await authApi.revokeCustomerToken();
                window.location.href = rootLink('/');
              },
            },
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
            {
              label: 'Sign in',
              variant: 'primary',
              onClick: () => { window.location.href = rootLink(CUSTOMER_LOGIN_PATH); },
            },
            {
              label: 'Home',
              variant: 'tertiary',
              onClick: () => { window.location.href = rootLink('/'); },
            },
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
