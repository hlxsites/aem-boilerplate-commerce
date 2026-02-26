// Initialize
// TODO - Add required initializer
// import '../../scripts/initializers/purchase-order.js';

export default async function decorate(block) {
  const x = document.createElement('spna');
  x.textContent = 'Seller Assisted Buying Placeholder';
  block.append(x);
}
