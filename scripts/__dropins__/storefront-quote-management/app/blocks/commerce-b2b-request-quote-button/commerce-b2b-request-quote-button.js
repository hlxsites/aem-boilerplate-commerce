import { events } from '@dropins/tools/event-bus.js';
import { RequestNegotiableQuoteForm } from '@dropins/quote-management/containers/RequestNegotiableQuoteForm.js';
import { render as quoteProvider } from '@dropins/quote-management/render.js';
import { Icon, Button, provider as UI } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';

export default async function decorate(block) {
    block.setAttribute('hidden', true);

    const button = document.createElement('button');
    button.textContent = 'Request Quote';
    button.setAttribute('disabled', true);

    let cartId = null;
    const uniqueId = Date.now();

    button.addEventListener('click', async () => {
        if (!cartId) {
            return;
        }

        button.setAttribute('disabled', true);
        button.textContent = 'Requesting...';

        const resetButton = () => {
            button.textContent = 'Request Quote';
            button.removeAttribute('disabled');
        };

        showQuoteForm(cartId, resetButton);
    });

    events.on('cart/data', (data) => {
        const isEmpty = data?.items?.length === 0 ?? true;
        const isGuest = data?.isGuestCart ?? true;

        // Only enable if not guest and cart is not empty
        if (!isGuest && !isEmpty) {
            cartId = data?.id;
            block.removeAttribute('hidden');
            button.removeAttribute('disabled');
        }
        else {
            block.setAttribute('hidden', true);
            button.setAttribute('disabled', true);
        }
    }, {
        eager: true,
    });

    block.appendChild(button);
}

const showQuoteForm = async (cartId, onClose) => {
    const quoteModal = document.createElement('div');
    quoteModal.setAttribute('id', 'quote-modal');

    // Close the quote modal when a negotiable quote is requested
    const { off: unsubscribe } = events.on('quote-management/negotiable-quote-requested', () => {
        setTimeout(() => {
            quoteModal.dispatchEvent(new CustomEvent('close-modal'));
        }, 3000);
    });

    quoteModal.addEventListener('close-modal', () => {
        // Unsubscribe from the event when the quote modal is closed to avoid memory leaks
        unsubscribe();
        quoteModal.remove();
        onClose && onClose();
    })

    quoteModal.onclick = () => {
        quoteModal.dispatchEvent(new CustomEvent('close-modal'));
    };

    const quoteForm = document.createElement('div');
    quoteForm.setAttribute('id', 'quote-form');
    quoteForm.onclick = (event) => {
        // Prevent the event from bubbling up to the quote modal
        event.stopPropagation();
    };

    quoteProvider.render(RequestNegotiableQuoteForm, {
        cartId,
        onError: (message) => {
            console.error('onError', message);
        },
        onSubmitErrors: (errors) => {
            console.error('onSubmitErrors', errors);
        },
        slots: {
            // Append a close button to the Save Draft button
            SaveDraftButton: (ctx) => {
                const closeButtonContainer = document.createElement('div');
                UI.render(Button, {
                    type: 'button',
                    children: 'Close',
                    onClick: () => {
                        quoteModal.dispatchEvent(new CustomEvent('close-modal'));
                    },
                    variant: 'secondary',
                })(closeButtonContainer);
                ctx.appendSibling(closeButtonContainer);
            }
        },
    })(quoteForm);

    // Append a close button to the quote form
    UI.render(Button, {
        type: 'button',
        className: 'quote-form__close-button',
        onClick: () => {
            quoteModal.dispatchEvent(new CustomEvent('close-modal'));
        },
        icon: h(Icon, {
            source: 'Close'
        }),
        variant: 'tertiary',
    })(quoteForm);

    quoteModal.appendChild(quoteForm);
    document.body.appendChild(quoteModal);
}
