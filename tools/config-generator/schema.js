// Full GraphQL query with both storeConfig and dataServices context
export const FULL_STORE_CONFIG_QUERY = `
  query {
    storeConfig {
      website_code
      store_code # storeview
      store_group_code # store
      root_category_uid
      store_name
      website_name
      base_currency_code
      base_url
    }
    dataServicesStorefrontInstanceContext {
      environment_id
      store_id
      website_id
      store_view_id
      api_key
      environment
      customer_group
    }
  }
`;

// Fallback query with just storeConfig
export const BASIC_STORE_CONFIG_QUERY = `
  query {
    storeConfig {
      website_code
      store_code
      store_group_code
      root_category_uid
      store_name
      website_name
      base_currency_code
      base_url
    }
  }
`;

export async function fetchStoreConfig(endpoint) {
  // Try the full query first
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FULL_STORE_CONFIG_QUERY,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check if there are errors related to dataServicesStorefrontInstanceContext
    if (data.errors && data.errors.some((error) => error.message.includes('dataServicesStorefrontInstanceContext')
      || error.message.includes('Cannot query field'))) {
      // Fall back to basic query
      return fetchBasicStoreConfig(endpoint);
    }

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    // If the full query fails, try the basic query
    console.warn('Full query failed, falling back to basic query:', error.message);
    return fetchBasicStoreConfig(endpoint);
  }
}

async function fetchBasicStoreConfig(endpoint) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: BASIC_STORE_CONFIG_QUERY,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  // Return data with null dataServicesStorefrontInstanceContext
  return {
    ...data.data,
    dataServicesStorefrontInstanceContext: null,
  };
}
