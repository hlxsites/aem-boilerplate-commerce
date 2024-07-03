/* eslint-disable implicit-arrow-linebreak */
// TODO - This module supposed to add link to authCombine container for demo purposes
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { AuthCombine } from '@dropins/storefront-auth/containers/AuthCombine.js';
import { SuccessNotification } from '@dropins/storefront-auth/containers/SuccessNotification.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { h } from '../../scripts/preact.js';
import { getCookie } from '../../scripts/configs.js';

const signInFormConfig = {
  renderSignUpLink: true,
  routeForgotPassword: () => '/customer/forgotpassword',
  successNotificationForm: (userName) =>
    h(SuccessNotification, {
      headingText: `Welcome ${userName}`,
      messageText: 'You have successfully logged in.',
      primaryButtonText: 'My Account',
      secondaryButtonText: 'Logout',
      onPrimaryButtonClick: () => {
        window.location.href = '/customer/account';
      },
      onSecondaryButtonClick: async () => {
        await authApi.revokeCustomerToken();
        window.location.href = '/';
      },
    }),
};

const signUpFormConfig = {
  routeSignIn: () => '/customer/login',
  routeRedirectOnSignIn: () => '/customer/account',
  successNotificationForm: (userName) =>
    h(SuccessNotification, {
      headingText: `Welcome ${userName}!`,
      messageText: 'Your account has been successfully created.',
      primaryButtonText: 'My Account',
      secondaryButtonText: 'Logout',
      onPrimaryButtonClick: () => {
        window.location.href = '/customer/account';
      },
      onSecondaryButtonClick: async () => {
        await authApi.revokeCustomerToken();
        window.location.href = '/';
      },
    }),
};

const resetPasswordFormConfig = {
  routeSignIn: () => '/customer/login',
};

const onHeaderLinkClick = () => {
  if (getCookie('auth_dropin_firstname')) {
    window.location.href = '/customer/account';
    return;
  }
  const signInModal = document.createElement('div');
  signInModal.setAttribute('id', 'auth-combine-modal');
  signInModal.classList.add('auth-combine-modal-overlay');

  const closeModalWindow = (event) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && event.target.nodeName === 'BODY') {
      signInModal.remove();
    }
  };

  window.addEventListener('keydown', closeModalWindow);

  signInModal.onclick = () => {
    signInModal.remove();
  };

  const signInForm = document.createElement('div');
  signInForm.setAttribute('id', 'auth-combine-wrapper');
  signInForm.onclick = (event) => {
    event.stopPropagation();
  };

  signInModal.appendChild(signInForm);
  document.body.appendChild(signInModal);

  authRenderer.render(AuthCombine, {
    signInFormConfig,
    signUpFormConfig,
    resetPasswordFormConfig,
  })(signInForm);
};

const renderAuthCombine = (navSections) => {
  if (getCookie('auth_dropin_firstname')) return;

  const navListEl = navSections.querySelector('.default-content-wrapper > ul');

  const test = document.createElement('li');
  test.classList.add('authCombineNavElement');
  test.innerText = 'Combined Auth';
  test.addEventListener('click', () => {
    onHeaderLinkClick();

    function getPopupElements() {
      const headerBlock = document.querySelector('.header.block');
      const headerLoginButton = document.querySelector('#header-login-button');
      const popupElement = document.querySelector('#popup-menu');
      const popupMenuContainer = document.querySelector('.popupMenuContainer');

      return {
        headerBlock,
        headerLoginButton,
        popupElement,
        popupMenuContainer,
      };
    }

    events.on('authenticated', (isAuthenticated) => {
      const authCombineNavElement = document.querySelector('.authCombineNavElement');
      if (isAuthenticated) {
        const { headerLoginButton, popupElement, popupMenuContainer } = getPopupElements();

        authCombineNavElement.style.display = 'none';
        popupMenuContainer.innerHTML = '';
        popupElement.style.minWidth = '250px';
        if (headerLoginButton) {
          const spanElementText = headerLoginButton.querySelector('span');
          spanElementText.textContent = `Hi, ${getCookie('auth_dropin_firstname')}`;
        }
        popupMenuContainer.insertAdjacentHTML(
          'afterend',
          `<ul class="popupMenuUrlList">
              <li><a href="/customer/account">My Account</a></li>
              <li><a href="/products/hollister-backyard-sweatshirt/MH05">Product page</a></li>
              <li><button class="logoutButton">Logout</button></li>
            </ul>`,
        );
      }
    });
  });

  navListEl.appendChild(test);
};

export default renderAuthCombine;
