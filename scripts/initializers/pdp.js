import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setEndpoint,
  setFetchGraphQlHeaders,
  fetchPDPData,
} from '@dropins/storefront-pdp/api.js';
import { initializeDropin } from './index.js';
import { getOptionsUIDsFromUrl, getSkuFromUrl } from '../commerce.js';
import { getConfigValue } from '../configs.js';
import { fetchPlaceholders } from '../aem.js';

await initializeDropin(async () => {
  // Set Fetch Endpoint (Service)
  setEndpoint(await getConfigValue('commerce-endpoint'));

  // Set Fetch Headers (Service)
  setFetchGraphQlHeaders({
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  });

  const sku = getSkuFromUrl();
  const optionsUIDs = getOptionsUIDsFromUrl();

  const [product, placeholders] = await Promise.all([
    fetchPDPData(sku, { optionsUIDs }),
    fetchPlaceholders(),
  ]);

  const langDefinitions = {
    default: {
      PDP: {
        Product: {
          Incrementer: { label: placeholders.pdpProductIncrementer },
          OutOfStock: { label: placeholders.pdpProductOutofstock },
          AddToCart: { label: placeholders.pdpProductAddtocart },
          Details: { label: placeholders.pdpProductDetails },
          RegularPrice: { label: placeholders.pdpProductRegularprice },
          SpecialPrice: { label: placeholders.pdpProductSpecialprice },
          PriceRange: {
            From: { label: placeholders.pdpProductPricerangeFrom },
            To: { label: placeholders.pdpProductPricerangeTo },
          },
          Image: { label: placeholders.pdpProductImage },
        },
        Swatches: {
          Required: { label: placeholders.pdpSwatchesRequired },
        },
        Carousel: {
          label: placeholders.pdpCarousel,
          Next: { label: placeholders.pdpCarouselNext },
          Previous: { label: placeholders.pdpCarouselPrevious },
          Slide: { label: placeholders.pdpCarouselSlide },
          Controls: {
            label: placeholders.pdpCarouselControls,
            Button: { label: placeholders.pdpCarouselControlsButton },
          },
        },
        Overlay: {
          Close: { label: placeholders.pdpOverlayClose },
        },
      },
      Custom: {
        AddingToCart: { label: placeholders.pdpCustomAddingtocart },
      },
    },
  };

  const models = {
    ProductDetails: {
      initialData: { ...product },
    },
  };

  // Initialize Dropins
  await initializers.mountImmediately(initialize, {
    sku,
    optionsUIDs,
    langDefinitions,
    models,
    acdl: true,
    persistURLParams: true,
  });
})();
