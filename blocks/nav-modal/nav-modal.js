import { loadFragment } from '../fragment/fragment.js';
import {
  buildBlock,
  decorateBlock,
  decorateIcons,
  loadBlock,
  loadCSS,
} from '../../scripts/aem.js';

let activeModal = null;
let timeoutId;

// This is not a traditional block, so there is no decorate function. Instead, links to
// a */modals/* path  are automatically transformed into a modal. Other blocks can also use
// the createModal() and openModal() functions.

export async function createModal(contentNodes) {
  await loadCSS(`${window.hlx.codeBasePath}/blocks/nav-modal/nav-modal.css`);
  const modal = document.createElement('div');
  modal.classList.add('nav-modal');
  const modalContent = document.createElement('div');
  modalContent.classList.add('nav-modal-content');
  modalContent.append(...contentNodes);
  modal.append(modalContent);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.type = 'button';
  closeButton.innerHTML = '<span class="icon icon-close"></span>';
  closeButton.addEventListener('click', () => closeModal(modal));
  modal.append(closeButton);

  const block = buildBlock('nav-modal', '');
  document.querySelector('main').append(block);
  decorateBlock(block);
  await loadBlock(block);
  decorateIcons(closeButton);

  block.append(modal);
  return {
    block,
    showModal: () => {
      if (activeModal) {
        closeModal(activeModal);
      }
      modal.classList.add('visible');
      activeModal = modal;

      // Google Chrome restores the scroll position when the modal is reopened,
      // so we need to reset it.
      setTimeout(() => {
        modalContent.scrollTop = 0;
      }, 0);
    },
    closeModal: () => closeModal(modal),
  };
}

function closeModal(modal) {
  modal.classList.remove('visible');
  activeModal = null;
  modal.parentElement.remove();
}

export async function openNavModal(fragmentUrl) {
  clearTimeout(timeoutId);
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  const fragment = await loadFragment(path);
  const { block, showModal, closeModal } = await createModal(
    fragment.childNodes
  );
  const modal = block.querySelector('.nav-modal');
  modal.fragmentUrl = fragmentUrl;

  showModal();

  const handleClickOutside = (event) => {
    if (!modal.contains(event.target)) {
      closeModal();
    }
  };

  const handleMouseOut = (event) => {
    if (!modal.contains(event.relatedTarget)) {
      closeModal();
    }
  };
  document.addEventListener('click', handleClickOutside);
  modal.addEventListener('mouseout', handleMouseOut);
}
