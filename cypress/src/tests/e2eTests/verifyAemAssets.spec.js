import { expectAemAssetsImage, expectDefaultImage } from '../../assertions/assets';

// The overridden config keys.
const MAGENTO_ENVIRONMENT_ID_KEY = 'public.default.headers.cs.Magento-Environment-Id';
const MAGENTO_API_KEY_KEY = 'public.default.headers.cs.x-api-key';
const ASSETS_ENABLED_KEY = 'public.default.commerce-assets-enabled';
const COMMERCE_CORE_ENDPOINT_KEY = 'public.default.commerce-core-endpoint';
const COMMERCE_ENDPOINT_KEY = 'public.default.commerce-endpoint';

describe.skip('AEM Assets enabled', () => {
  beforeEach(() => {
    cy.interceptConfig((config) => {
      Cypress._.set(config, MAGENTO_ENVIRONMENT_ID_KEY, Cypress.env('MAGENTO_ENVIRONMENT_ID'))
      Cypress._.set(config, MAGENTO_API_KEY_KEY, Cypress.env('MAGENTO_API_KEY'))
      Cypress._.set(config, COMMERCE_CORE_ENDPOINT_KEY, Cypress.env('COMMERCE_CORE_ENDPOINT'))
      Cypress._.set(config, COMMERCE_ENDPOINT_KEY, Cypress.env('COMMERCE_ENDPOINT'))
      Cypress._.set(config, ASSETS_ENABLED_KEY, 'true')

      return config
    })
  });

  it('[PLP Widget]: should load and show AEM Assets optimized images', () => {
    cy.visit('/gear');
    
    // Scroll to the bottom of the page to ensure all lazy-loaded images are loaded
    // Wait a bit so that lazy loaded images start loading.
    // Then scroll back to the top.
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(500);
    cy.scrollTo('top');
    
    waitForAemAssetImages('.ds-sdk-product-list img', (images) => {
      const expectedOptions = {
        protocol: 'http://',
        environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
        format: 'webp',
        quality: 80,
        width: 200,
      }

      for (const image of images) {
        expectAemAssetsImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.a('number');
          expect(screenWidth).to.be.undefined;

          expectAemAssetsImage(url, { 
            ...expectedOptions, 
            width: expectedOptions.width * density,
          });
        }
      }
    });
  });
});

describe('AEM Assets disabled', () => {
  beforeEach(() => {
    cy.interceptConfig((config) => {
      Cypress._.set(config, MAGENTO_ENVIRONMENT_ID_KEY, 'f38a0de0-764b-41fa-bd2c-5bc2f3c7b39a')
      Cypress._.set(config, MAGENTO_API_KEY_KEY, '4dfa19c9fe6f4cccade55cc5b3da94f7')
      Cypress._.set(config, COMMERCE_CORE_ENDPOINT_KEY, 'https://www.aemshop.net/graphql')
      Cypress._.set(config, COMMERCE_ENDPOINT_KEY, 'https://www.aemshop.net/cs-graphql')
      Cypress._.set(config, ASSETS_ENABLED_KEY, 'false')

      return config
    })
  });

  it('[PLP Widget]: should show original images when AEM Assets is disabled', () => {
    cy.visit('/gear');

    // Scroll to the bottom of the page to ensure all lazy-loaded images are loaded
    // Wait a bit so that lazy loaded images start loading.
    // Then scroll back to the top.
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(500);
    cy.scrollTo('top');

    waitForDefaultImages('.ds-sdk-product-list img', (images) => {
      const expectedOptions = {
        protocol: 'http://',
        format: 'jpg',
        fit: 'cover',
        width: 200,
        crop: false,
        dpi: 1
      }

      for (const image of images) {
        expectDefaultImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.a('number');
          expect(screenWidth).to.be.undefined;

          expectDefaultImage(url, {
            ...expectedOptions,

            quality: 80,
            auto: 'webp',
            width: expectedOptions.width * density,
          });
        }
      }
    });
  });
});

/**
 * Wait for an AEM Asset image to be loaded.
 * @param {string} selector - The selector of the images to wait for.
 * @param {(images: import('../../support/index.d.ts').ImageData[]) => void} callback - The callback to call with the images.
 */
function waitForAemAssetImages(selector, callback) {
  cy.waitForImages(selector, (images) => {
    expect(images.length).to.be.greaterThan(0);
    callback(images);
  }, (image) => {
    expect(image.src).to.include("adobeaemcloud.com");
  });
}

/**
 * Wait for a default image to be loaded.
 * @param {string} selector - The selector of the images to wait for.
 * @param {(images: import('../../support/index.d.ts').ImageData[]) => void} callback - The callback to call with the images.
 */
function waitForDefaultImages(selector, callback) {
  cy.waitForImages(selector, (images) => {
    expect(images.length).to.be.greaterThan(0);
    callback(images);
  }, (image) => {
    expect(image.src).to.include("aemshop.net");
  });
}