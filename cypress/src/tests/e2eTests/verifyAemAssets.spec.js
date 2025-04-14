const CONFIG_KEY = 'config:dev';
const MAGENTO_ENVIRONMENT_ID_KEY = 'commerce.headers.cs.Magento-Environment-Id';
const MAGENTO_API_KEY_KEY = 'commerce.headers.cs.x-api-key';
const ASSETS_ENABLED_KEY = 'commerce-assets-enabled';

function updateSessionStorageConfig(window, updates) {
  const config = JSON.parse(window.sessionStorage.getItem(CONFIG_KEY)) || { data: [] };

  config.data = config.data.map((item) => {
    if (updates[item.key]) {
      return { ...item, value: updates[item.key] };
    }
    return item;
  });

  Object.keys(updates).forEach((key) => {
    if (!config.data.some((item) => item.key === key)) {
      config.data.push({ key, value: updates[key] });
    }
  });

  window.sessionStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

describe('AEM Assets enabled', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      updateSessionStorageConfig(window, {
        [MAGENTO_ENVIRONMENT_ID_KEY]: Cypress.env('MAGENTO_ENVIRONMENT_ID'),
        [MAGENTO_API_KEY_KEY]: Cypress.env('MAGENTO_API_KEY'),
        [ASSETS_ENABLED_KEY]: 'true',
      });
    });
  });

  it('should show optimized images when isAemAssetsEnabled is true', () => {
    cy.visit('/search?q=jacket');
    cy.get('img').should(($imgs) => {
      $imgs.each((_, img) => {
        expect(img.complete).to.be.true
        expect(img.naturalWidth).to.be.greaterThan(0)
      })
    }).then(($imgs) => {
      const srcList = Cypress._.map($imgs, (img) => img.getAttribute('src'))

      for (const src of srcList) {
        const urnMatch = src.match(/urn:aaid:aem:[^/]+/);
        const imageNameMatch = src.match(/\/as\/([^/]+)\.webp\?/);

        if (urnMatch && imageNameMatch) {
          const urn = urnMatch[0];
          const imageName = imageNameMatch[1];
          const aemAssetsEnvironment = Cypress.env('AEM_ASSETS_ENVIRONMENT');
          const expectedSrc = `http:////delivery-${aemAssetsEnvironment}.adobeaemcloud.com/adobe/assets/${urn}/as/${imageName}.webp?quality=80&width=200`;

          expect(src).to.equal(expectedSrc);
        }

        expect(src).to.include('/as/');
        expect(src).not.to.include('fit=');
      }
    })
  });
});

describe('AEM Assets disabled', () => {
  it('should show optimized images when isAemAssetsEnabled is false', () => {
    cy.visit('/search?q=jacket');
    cy.get('img').should(($imgs) => {
      $imgs.each((_, img) => {
        expect(img.complete).to.be.true
        expect(img.naturalWidth).to.be.greaterThan(0)
      })
    }).then(($imgs) => {
      const srcList = Cypress._.map($imgs, (img) => img.getAttribute('src'))

      for (const src of srcList) {
        const imageNameMatch = src.match(/\/w\/j\/([^/]+)\.jpg/);
        if (imageNameMatch) {
          const imageName = imageNameMatch[1];
          const expectedSrc = `http:////mcstaging.aemshop.net/media/catalog/product/w/j/${imageName}.jpg?fit=cover&dpi=1&width=200`;

          expect(src).to.equal(expectedSrc);
        }

        expect(src).not.to.include('/as/');
        expect(src).to.include('fit=');
      }
    });
  });
});
