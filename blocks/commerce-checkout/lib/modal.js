import { createModal } from '../../modal/modal.js';

let modal;

export async function showModal(content) {
  modal = await createModal([content]);
  modal.showModal();
}

export function removeModal() {
  if (!modal) return;
  modal.removeModal();
  modal = null;
}
