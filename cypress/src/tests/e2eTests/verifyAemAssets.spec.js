import { expectAemAssetsImage, expectDefaultImage } from '../../assertions/assets';
import {
  checkMoneyOrder,
  customerBillingAddress,
  customerShippingAddress,
  paymentServicesCreditCard,
  products
} from "../../fixtures";
import {
  assertAuthUser,
  assertCartSummaryMisc,
  assertCartSummaryProduct,
  assertCartSummaryProductsOnCheckout, assertOrderConfirmationBillingDetails,
  assertOrderConfirmationCommonDetails, assertOrderConfirmationShippingDetails, assertOrderConfirmationShippingMethod,
  assertOrderSummaryMisc,
  assertProductImage,
  assertSelectedPaymentMethod,
  assertTitleHasLink
} from "../../assertions";
import {
  checkTermsAndConditions, placeOrder,
  setGuestBillingAddress,
  setGuestShippingAddress,
  setPaymentMethod,
  signUpUser,
  uncheckBillToShippingAddress
} from "../../actions";

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

  it('[PDP Dropin]: should load and show AEM Assets optimized images', () => {
    visitWithEagerImages('/products/blue-jacket/blue-jacket');

    const expectedOptions = {
      protocol: 'http://',
      environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
      format: 'webp',
      quality: 80,
    }

    const srcSetExpectedOptions = {
      ...expectedOptions,
      protocol: '//',
    }

    // Normal gallery images.
    waitForAemAssetImages('.pdp-carousel__wrapper img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 960,
          height: 1191,
        });

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...srcSetExpectedOptions,
            width: screenWidth / 2,
            height: 1191,
          });
        }
      }
    });

    waitForAemAssetImages('.pdp-carousel__wrapper ~ div img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 200,
          height: 248,
        });

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectAemAssetsImage(url, {
            ...srcSetExpectedOptions,

            width: (200 * screenWidth) / 1920,
            height: 248,
          });
        }
      }
    });

    // TODO: Once Swatch Images are supported by AEM Assets, add tests for them.
  });

  it('[My Account Dropin]: should load and show AEM Assets optimized images', () => {
    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]').eq(1).clear().type(Cypress.env('USER_PASSWORD'));
    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click( {force: true } );
    cy.wait(2000);

    cy.visit("/customer/account");
    const expectedOptions = {
      protocol: 'https://',
      environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
      format: 'webp',
      quality: 80,
    }

    waitForAemAssetImages('.account-orders-list-card__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 65,
          height: 65,

        });
      }
    });
    signOut();
  });

  it('[Order Product List Dropin]: should load and show AEM Assets optimized images', () => {
    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]').eq(1).clear().type(Cypress.env('USER_PASSWORD'));
    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click({ force: true });
    cy.wait(2000);

    cy.visit("/customer/orders");

    const expectedOptions = {
      protocol: 'https://',
      environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
      format: 'webp',
      quality: 80,
    }

    waitForAemAssetImages('.account-orders-list-card__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 65,
          height: 65,

        });
      }
    });
    signOut();
  });

  it('[Order Product Details Dropin]: should load and show AEM Assets optimized images', () => {
    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]').eq(1).clear().type(Cypress.env('USER_PASSWORD'));
    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click({ force: true });
    cy.wait(2000);

    cy.visit("/customer/order-details?orderRef=000000036");

    const expectedOptions = {
      protocol: 'https://',
      environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
      format: 'webp',
      quality: 80,
    }

    waitForAemAssetImages('.dropin-cart-item img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 90,
          height: 120,

        });
      }
    });

    signOut();
  });

  it('[Returns List Dropin]: should load and show AEM Assets optimized images', () => {
    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]').eq(1).clear().type(Cypress.env('USER_PASSWORD'));
    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click({ force: true });
    cy.wait(2000);

    cy.visit("customer/returns");

    const expectedOptions = {
      protocol: 'https://',
      environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
      format: 'webp',
      quality: 80,
    }

    waitForAemAssetImages('.order-returns-list-content__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 85,
          height: 114,

        });
      }
    });
    signOut();
  });

  it('[Order Returns Dropin]: should load and show AEM Assets optimized images', () => {
    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]').eq(1).clear().type(Cypress.env('USER_PASSWORD'));
    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click({ force: true });
    cy.wait(2000);

    cy.visit("/customer/order-details?orderRef=000000035");

    const expectedOptions = {
      protocol: 'https://',
      environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
      format: 'webp',
      quality: 80,
    }

    waitForAemAssetImages('.order-returns-list-content__images img', (images) => {
      for (const image of images) {
        expectAemAssetsImage(image.src, {
          ...expectedOptions,
          width: 85,
          height: 114,

        });
      }
    });

    signOut();
  });

  it('[Create Return Dropin]: should load and show AEM Assets optimized images', () => {
    cy.visit("/customer/login");
    cy.get('input[name="email"]').clear().type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]').eq(1).clear().type(Cypress.env('USER_PASSWORD'));
    cy.wait(2000);
    cy.get('.auth-sign-in-form__button--submit').eq(1).click({ force: true });
    cy.wait(2000);

    cy.visit("/customer/order-details?orderRef=000000036");

    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Return")').length > 0) {
        cy.contains('button', 'Return').click();

        const expectedOptions = {
          protocol: 'https://',
          environment: Cypress.env('AEM_ASSETS_ENVIRONMENT'),
          format: 'webp',
          quality: 80,
        }

        waitForAemAssetImages('.dropin-cart-item__image img', (images) => {
          for (const image of images) {
            expectAemAssetsImage(image.src, {
              ...expectedOptions,
              width: 85,
              height: 114,

            });
          }
        });
      } else {
        cy.log('No eligible order found for returns');
      }
    });
    signOut();
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
    cy.visit('/apparel');

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

  it('[PDP Dropin]: should show original images when AEM Assets is disabled', () => {
    visitWithEagerImages('/products/play-create-repeat-crewneck/ADB388');

    const expectedOptions = {
      protocol: '//',
      format: 'jpg',
    }

    const srcSetExpectedOptions = {
      ...expectedOptions,
      auto: 'webp',
      quality: 80,
      crop: false,
      fit: 'cover',
    }

    // Normal gallery images.
    waitForDefaultImages('.pdp-carousel__wrapper img', (images) => {
      for (const image of images) {
        expectDefaultImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectDefaultImage(url, {
            ...srcSetExpectedOptions,
            width: screenWidth / 2,
            height: 1191,
          });
        }
      }
    });

    waitForDefaultImages('.pdp-carousel__wrapper ~ div img', (images) => {
      for (const image of images) {
        expectDefaultImage(image.src, expectedOptions);

        for (const { url, screenWidth, density } of image.srcsetEntries) {
          expect(density).to.be.undefined;
          expect(screenWidth).to.be.a('number');

          expectDefaultImage(url, {
            ...srcSetExpectedOptions,
            width: (image.element.getAttribute('width') * screenWidth) / 1920,
          });
        }
      }
    });
  });

  it('[My Account Dropin]: should show original images when AEM Assets is disabled', () => {
    cy.visit(products.configurable.urlPathWithOptions);
    cy.wait(5000);
    cy.contains('Add to Cart').click();
    cy.get('.minicart-wrapper').click();
    cy.contains('View Cart').click();
    cy.visit("/customer/create");
    cy.get('.minicart-wrapper').should('be.visible')
    cy.fixture('userInfo').then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });
    cy.get('.minicart-wrapper').click();
    cy.visit("/products/youth-tee/ADB150");
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .click();
    cy.get('.minicart-wrapper').click();
    cy.contains('View Cart').click();

    cy.contains('Estimated Shipping').should('be.visible');
    cy.get('.dropin-button.dropin-button--medium.dropin-button--primary')
      .contains('Checkout')
      .click({ force: true });
    setGuestShippingAddress(customerShippingAddress, true);
    cy.wait(2000);
    setPaymentMethod(paymentServicesCreditCard);
    checkTermsAndConditions();
    cy.wait(5000);
    placeOrder();
    assertOrderConfirmationCommonDetails(customerShippingAddress, paymentServicesCreditCard);

    cy.visit("/customer/account");
    const expectedOptions = {
      protocol: 'https://',
      format: 'jpg',
    }

    waitForDefaultImages('.account-orders-list-card__images img', (images) => {
      for (const image of images) {
        expectDefaultImage(image.src, {...expectedOptions,});
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

/**
 * Visit a page with eager loading for all images.
 * @param {string} url - The URL to visit.
 * @returns {Cypress.Chainable} - The chainable object.
 */
function visitWithEagerImages(url) {
  // We do this because otherwise we need to go and interact with different elements to find images that are not loaded eagerly.
  return cy.visit(url, {
    onBeforeLoad(win) {
      // Force eager loading for all images
      Object.defineProperty(win.HTMLImageElement.prototype, 'loading', {
        configurable: true,
        get() { return 'eager'; },
        set() {}
      });
    }
  });
}

/**
 * Helper function to sign out test user.
 */
function signOut() {
  cy.get('.nav-dropdown-button').contains('Hi, Bob').click();
  cy.get('#nav > div.section.nav-tools > div.dropdown-wrapper.nav-tools-wrapper > div > ul > li:nth-child(2) > button').click();
  cy.get('.auth-sign-in-form__button--submit');
  cy.wait(1000);
}
