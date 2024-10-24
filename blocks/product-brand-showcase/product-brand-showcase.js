import { readBlockConfig } from '../../scripts/aem.js';
import {
  performCatalogServiceQuery,
  renderPrice,
} from '../../scripts/commerce.js';

const productShowcaseQuery = `query productShowcase($skus: [String!]!) {
  products(skus: $skus) {
    sku
    urlKey
    name
    addToCartAllowed
    __typename
    images(roles: ["small_image"]) {
      label
      url
    }
    ... on SimpleProductView {
      price {
        ...priceFields
      }
    }
    ... on ComplexProductView {
      priceRange {
        minimum {
          ...priceFields
        }
        maximum {
          ...priceFields
        }
      }
    }
  }
}
fragment priceFields on ProductViewPrice {
  regular {
    amount {
      currency
      value
    }
  }
  final {
    amount {
      currency
      value
    }
  }
}`;

function renderPlaceholder(config, block) {
  block.textContent = '';
  block.appendChild(
    document.createRange().createContextualFragment(`
      <div>
        <ul>
          <li>
            <em> 
              <a href="/" title="Balenciaga">Balenciaga</a>
            </em>
          </li>
        </ul>
      </div>
    <div class="image">
      <div class="placeholder"></div>
    </div>
    <div class="details">
      <h1></h1>
      <div class="price"></div>
      <div class="actions">
        ${
          config['details-button']
            ? '<a href="#" class="button primary disabled">Details</a>'
            : ''
        }
        ${
          config['cart-button']
            ? '<button class="secondary" disabled>Add to Cart</button>'
            : ''
        }
      </div>
    </div>
  `)
  );
}

function renderImage(image, size = 250) {
  const { url: imageUrl, label } = image;
  const createUrlForWidth = (url, w, useWebply = true) => {
    const newUrl = new URL(url, window.location);
    if (useWebply) {
      newUrl.searchParams.set('format', 'webply');
      newUrl.searchParams.set('optimize', 'medium');
    } else {
      newUrl.searchParams.delete('format');
    }
    newUrl.searchParams.set('width', w);
    newUrl.searchParams.delete('quality');
    newUrl.searchParams.delete('dpr');
    newUrl.searchParams.delete('bg-color');
    return newUrl.toString();
  };

  const createUrlForDpi = (url, w, useWebply = true) =>
    `${createUrlForWidth(url, w, useWebply)} 1x, ${createUrlForWidth(
      url,
      w * 2,
      useWebply
    )} 2x, ${createUrlForWidth(url, w * 3, useWebply)} 3x`;

  const webpUrl = createUrlForDpi(imageUrl, size, true);
  const jpgUrl = createUrlForDpi(imageUrl, size, false);

  return document.createRange().createContextualFragment(`<picture>
      <source srcset="${webpUrl}" />
      <source srcset="${jpgUrl}" />
      <img height="${size}" width="${size}" src="${createUrlForWidth(
    imageUrl,
    size,
    false
  )}" loading="eager" alt="${label}" />
    </picture>
  `);
}

function renderProduct(product, config, block) {
  const { name, urlKey, sku, price, priceRange, addToCartAllowed, __typename } =
    product;

  const currency =
    price?.final?.amount?.currency ||
    priceRange?.minimum?.final?.amount?.currency;
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  const fragment = document.createRange().createContextualFragment(`
    <div class="image">
    </div>
    <a href='/products/${urlKey}/${sku}' aria-label="View details for ${name}">
      <div class="details">
        <h1 class="brand"><a href='/products/${urlKey}/${sku}'>${name}</a></h1>
        <h1 class="colour">black</h1>
        <div class="price">${renderPrice(product, priceFormatter.format)}</div>
        <div class="actions">
          ${
            config['details-button']
              ? `<a href="/products/${urlKey}/${sku}" class="button primary">View ${name}</a>`
              : ''
          }
          ${
            config['cart-button'] &&
            addToCartAllowed &&
            __typename === 'SimpleProductView'
              ? '<button class="add-to-cart secondary">Add to Cart</button>'
              : ''
          }
        </div>
      </div>
    </a>
  `);

  fragment
    .querySelector('.image')
    .appendChild(renderImage(product.images[0], 250));

  const addToCartButton = fragment.querySelector('.add-to-cart');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', async () => {
      const { cartApi } = await import('../../scripts/minicart/api.js');
      // TODO: productId not exposed by catalog service as number
      window.adobeDataLayer.push({
        productContext: { productId: 0, ...product },
      });
      cartApi.addToCart(product.sku, [], 1, 'product-teaser');
    });
  }

  const productContainer = document.createElement('div');
  productContainer.classList.add('product');

  productContainer.appendChild(fragment);

  block.appendChild(productContainer);
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  config['details-button'] = !!(
    config['details-button'] || config['details-button'] === 'true'
  );
  config['cart-button'] = !!(
    config['cart-button'] || config['cart-button'] === 'true'
  );

  block.textContent = '';
  renderPlaceholder(config, block);

  let skus = Array.isArray(config.sku)
    ? config.sku
    : config.sku
        .split('\n')
        .map((sku) => sku.trim())
        .filter((sku) => sku !== '');

  try {
    const result = await performCatalogServiceQuery(productShowcaseQuery, {
      skus,
    });

    block.textContent = '';

    if (
      result &&
      Array.isArray(result.products) &&
      result.products.length > 0
    ) {
      result.products.forEach((product) => {
        product.images = product.images.map((image) => ({
          ...image,
          url: image.url.replace(/^https?:/, ''),
        }));
        renderProduct(product, config, block);
      });
    } else {
      console.error('No products found for the provided SKUs');
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
}
