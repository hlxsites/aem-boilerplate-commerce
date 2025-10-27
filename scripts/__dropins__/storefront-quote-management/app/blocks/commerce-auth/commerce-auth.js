import { AuthCombine } from '@dropins/storefront-auth/containers/AuthCombine.js';
import { render as authProvider } from '@dropins/storefront-auth/render.js';
import { revokeCustomerToken } from '@dropins/storefront-auth/api.js';
import { events } from '@dropins/tools/event-bus.js';

export default async function decorate(block) {
    const blockAttributes = Array.from(block.attributes);

    const button = document.createElement('button');
    blockAttributes.forEach(attribute => {
        button.setAttribute(attribute.name, attribute.value);
    });

    events.on('authenticated', (authenticated) => {
        if (authenticated) {
            button.innerText = 'Logout';
            button.removeEventListener('click', handleLoginClick);
            button.addEventListener('click', handleLogoutClick);
        }
        else {
            button.innerText = 'Login';
            button.removeEventListener('click', handleLogoutClick);
            button.addEventListener('click', handleLoginClick);
        }
    }, {
        eager: true
    });

    button.removeAttribute('disabled');

    block.replaceWith(button);

    return button;
}

const handleLoginClick = () => {
    const signInModal = document.createElement('div');
    signInModal.setAttribute('id', 'signin-modal');
    signInModal.onclick = () => {
        signInModal.remove();
    };

    const signInForm = document.createElement('div');
    signInForm.setAttribute('id', 'signin-form');
    signInForm.onclick = (event) => {
        event.stopPropagation();
    };

    authProvider.render(AuthCombine, {
        signInFormConfig: { renderSignUpLink: true },
        signUpFormConfig: {},
        resetPasswordFormConfig: {},
    })(signInForm);

    signInModal.appendChild(signInForm);
    document.body.appendChild(signInModal);

    events.on('authenticated', (authenticated) => {
        if (authenticated) {
            signInModal.remove();
        }
    });
}

const handleLogoutClick = () => {
    revokeCustomerToken();
}
