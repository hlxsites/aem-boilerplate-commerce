// Initialize
// TODO - Add quick order initializer
// import '../../scripts/initializers/purchase-order.js';

export default async function decorate(block) {
  const placeholder = document.createElement('h2');
  placeholder.textContent = 'Quick Order Block';
  block.appendChild(placeholder);
}
