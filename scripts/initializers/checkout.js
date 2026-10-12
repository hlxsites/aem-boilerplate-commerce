import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/checkout.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, {
    langDefinitions,
    models: {
      CartModel: {
        // The dropin spreads additionalData into setPaymentMethodOnCart, which rejects
        // oope_payment_method_config, so blank it there and expose it per method code instead.
        // The model is deep-merged, so the key has to be overwritten rather than omitted.
        transformer: (data) => {
          const methods = data?.available_payment_methods?.filter(Boolean) ?? [];
          return {
            availablePaymentMethods: methods.map(() => ({
              additionalData: { oope_payment_method_config: undefined },
            })),
            oopePaymentMethodConfigs: Object.fromEntries(
              methods.map(({ code, oope_payment_method_config: config }) => [code, config]),
            ),
          };
        },
      },
    },
  });
})();
