export function generateConfig(endpoint, storeConfig, dataServicesContext, environmentType = 'paas') {
  // Decode base64 root_category_uid to get the actual category ID
  const decodeBase64 = (str) => {
    try {
      return atob(str);
    } catch (e) {
      return str; // Return original if decoding fails
    }
  };

  // Extract environment ID from URL pattern .../HERE/graphql
  const extractEnvironmentId = (url) => {
    const match = url.match(/\/([^/]+)\/graphql$/);
    return match ? match[1] : '';
  };

  const rootCategoryId = storeConfig.root_category_uid
    ? decodeBase64(storeConfig.root_category_uid)
    : '2';

  // Determine environment ID: prefer dataServices context, fallback to URL extraction
  const environmentId = dataServicesContext?.environment_id || extractEnvironmentId(endpoint) || 'UNKNOWN';

  // Generate headers based on environment type
  const generateHeaders = () => {
    const baseHeaders = {
      all: {
        Store: 'default',
      },
    };

    switch (environmentType) {
      case 'aco':
        return {
          ...baseHeaders,
          cs: {
            'ac-channel-id': 'UNKNOWN',
            'ac-environment-id': environmentId,
            'ac-price-book-id': 'UNKNOWN',
            'ac-scope-locale': 'en-US',
          },
        };

      case 'saas':
        return {
          ...baseHeaders,
          cs: {
            'Magento-Customer-Group': 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c',
            'Magento-Store-Code': storeConfig.store_group_code || 'UNKNOWN',
            'Magento-Store-View-Code': storeConfig.store_code || 'UNKNOWN',
            'Magento-Website-Code': storeConfig.website_code || 'UNKNOWN',
            // Note: x-api-key and Magento-Environment-Id are not required for SAAS
          },
        };

      case 'paas':
      default:
        return {
          ...baseHeaders,
          cs: {
            'Magento-Customer-Group': 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c',
            'Magento-Store-Code': storeConfig.store_group_code || 'UNKNOWN',
            'Magento-Store-View-Code': storeConfig.store_code || 'UNKNOWN',
            'Magento-Website-Code': storeConfig.website_code || 'UNKNOWN',
            'x-api-key': dataServicesContext?.api_key || 'UNKNOWN',
            'Magento-Environment-Id': environmentId,
          },
        };
    }
  };

  return {
    public: {
      default: {
        'commerce-core-endpoint': endpoint,
        'commerce-endpoint': endpoint,
        headers: generateHeaders(),
        analytics: {
          'base-currency-code': storeConfig.base_currency_code || 'USD',
          environment: dataServicesContext?.environment || 'Production',
          'environment-id': environmentId,
          'store-code': storeConfig.store_group_code || 'UNKNOWN',
          'store-id': storeConfig.store_group_code || 'UNKNOWN',
          'store-name': storeConfig.store_name || 'UNKNOWN',
          'store-url': storeConfig.base_url || 'UNKNOWN',
          'store-view-code': storeConfig.store_code || 'UNKNOWN',
          'store-view-id': storeConfig.store_code || 'UNKNOWN',
          'store-view-name': storeConfig.store_name || 'UNKNOWN',
          'website-code': storeConfig.website_code || 'UNKNOWN',
          'website-id': storeConfig.website_code || 'UNKNOWN',
          'website-name': storeConfig.website_name || 'UNKNOWN',
        },
        plugins: {
          picker: {
            rootCategory: rootCategoryId,
          },
        },
      },
    },
  };
}
