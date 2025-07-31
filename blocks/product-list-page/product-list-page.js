import ProductList from '@dropins/storefront-product-discovery/containers/ProductList.js';
import Facets from '@dropins/storefront-product-discovery/containers/Facets.js';
import ResultsInfo from '@dropins/storefront-product-discovery/containers/ResultsInfo.js';
import { render as provider } from '@dropins/storefront-product-discovery/render.js';
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';
// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { fetchPlaceholders, rootLink } from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/search.js';
import '../../scripts/initializers/wishlist.js';

export default async function decorate(block) {
  const labels = await fetchPlaceholders();

  const config = readBlockConfig(block);

  const fragment = document.createRange().createContextualFragment(`
    <div class="search__input"></div>
    <div class="search__wrapper">
      <div class="search__left-column">
        <div class="search__result-info"></div>
        <div class="search__facets"></div>
      </div>
      <div class="search__right-column">
        <div class="search__product-list"></div>
      </div>
    </div>
  `);

  const $resultInfo = fragment.querySelector('.search__result-info');
  const $facets = fragment.querySelector('.search__facets');
  const $productList = fragment.querySelector('.search__product-list');

  block.innerHTML = '';
  block.appendChild(fragment);

  // Add category url path to block for enrichment
  if (config.urlpath) {
    block.dataset.category = config.urlpath;
  }

  const categoryPathConfig = config.urlpath ? { categoryPath: config.urlpath } : {};

  return Promise.all([
    provider.render(ResultsInfo, { })($resultInfo),
    provider.render(Facets, {
      slots: {
        FacetBucketLabel: (ctx) => {
          // Here we are overriding the default Facet labels.
          const $label = document.createElement('span');
          $label.innerText = `${ctx.data.name ?? ctx.data.title} (${ctx.data.count})`;

          // If the facet has an icon, add it to the label
          if (ctx.data.icon) {
            const $icon = document.createElement('img');
            $icon.className = 'facet-bucket-label__icon';
            $icon.src = ctx.data.icon;
            $label.prepend($icon);
          }

          ctx.replaceWith($label);
        },
      },
    })($facets),
    provider.render(ProductList, {
      routeProduct: (product) => rootLink(`/products/${product.urlKey}/${product.sku}`),
      ...categoryPathConfig,
      slots: {
        ProductActions: async (ctx) => {
          // Track selected options
          const options = new Map();

          // Add to Cart Button Validation
          // If there are options, the button is disabled until all options are selected
          const isAddToCartValid = () => {
            if (ctx.product.options) {
              return options.size === ctx.product.options.length;
            }
            // If there are no options, the button is enabled
            return true;
          };

          // Add to Cart Button
          const $addToCartButton = document.createElement('div');
          $addToCartButton.className = 'product-discovery-product-actions__add-to-cart';

          // The UI.render function allows you to render a component from the Drop-in library
          // such as the Button component. You may also use any other standard HTML element.
          const addToCartButton = await UI.render(Button, {
            children: labels.Global?.AddProductToCart,
            icon: Icon({ source: 'Cart' }),
            disabled: !isAddToCartValid(), // Disable button if not all options are selected
            onClick: () => {
              // Call the Cart Drop-in API to add the product to the cart with the selected options
              cartApi.addProductsToCart([{
                sku: ctx.product.sku,
                quantity: 1,
                // Pass the selected options to the API
                optionsUIDs: [...options.values()],
              }]);
            },
            variant: 'primary',
          })($addToCartButton);

          // Render Options (if any)
          // ctx.product.options is the options data fetched from the API in the build.mjs file
          // and transformed in the Product model.
          if (ctx.product.options?.length > 0) {
            const $optionsWrapper = document.createElement('div');
            $optionsWrapper.className = 'product-discovery-product-actions__options';

            ctx.product.options.forEach((option) => {
              const $options = document.createElement('select');
              $options.name = option.id;
              const placeholder = document.createElement('option');
              placeholder.value = 'select';
              placeholder.textContent = option.title;
              placeholder.selected = true;
              placeholder.disabled = true;
              $options.appendChild(placeholder);
              // options
              option.values.forEach((value) => {
                const $option = document.createElement('option');
                $option.value = value.id;
                $option.textContent = value.title;
                $options.appendChild($option);
              });

              // Update the options map when the user selects an option
              $options.addEventListener('change', (e) => {
                // update options map
                options.set(option.id, e.target.value);
                // validation: toggle disabled state based on the number of options selected
                addToCartButton.setProps((prev) => ({ ...prev, disabled: !isAddToCartValid() }));
              });

              $optionsWrapper.appendChild($options);
            });

            ctx.appendChild($optionsWrapper);
          }

          // Actions
          const actionsWrapper = document.createElement('div');
          actionsWrapper.className = 'product-discovery-product-actions';

          // Add to Cart Button
          actionsWrapper.appendChild($addToCartButton);

          // Wishlist Button
          const $wishlistToggle = document.createElement('div');
          $wishlistToggle.classList.add('product-discovery-product-actions__wishlist-toggle');
          wishlistRender.render(WishlistToggle, {
            product: ctx.product,
          })($wishlistToggle);
          actionsWrapper.appendChild($wishlistToggle);
          ctx.appendChild(actionsWrapper);
        },
      },
    })($productList),
  ]);
}
