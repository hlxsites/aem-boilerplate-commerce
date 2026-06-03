// accsClient.js
const httpClient = require('./httpClient');
const TokenManager = require('./tokenManager');

class ACCSApiClient {
  constructor() {
    this.baseURL = Cypress.env("API_ENDPOINT");
    this.tokenManager = new TokenManager();
  }

  async request(method, endpoint, data = null, queryParams = {}) {
    console.log(`\n🌐 API Request: ${method} ${endpoint}`);
    console.log(`📍 Base URL: ${this.baseURL}`);
    if (data) {
      console.log(`📦 Request Data:`, JSON.stringify(data, null, 2));
    }
    
    const accessToken = await this.tokenManager.getValidToken();
    console.log(`🔑 Access Token: ${accessToken ? accessToken.substring(0, 20) + '...' : 'MISSING'}`);

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'x-api-key': Cypress.env("IMS_CLIENT_ID"),
      'x-gw-ims-org-id': Cypress.env("IMS_ORG_ID"),
      'Content-Type': 'application/json'
    };
    
    console.log(`🔧 Headers:`, {
      'x-api-key': Cypress.env("IMS_CLIENT_ID"),
      'x-gw-ims-org-id': Cypress.env("IMS_ORG_ID"),
      'Authorization': 'Bearer ' + (accessToken ? '***' : 'MISSING')
    });

    // Build URL with query parameters
    let url = `${this.baseURL}${endpoint}`;
    if (Object.keys(queryParams).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (typeof value === 'object') {
          searchParams.append(key, JSON.stringify(value));
        } else {
          searchParams.append(key, value);
        }
      });
      url += `?${searchParams.toString()}`;
    }

    console.log(`🚀 Full Request URL: ${url}`);
    
    try {
      const response = await httpClient({
        method,
        url,
        headers,
        data,
        validateStatus: status => status < 500
      });

      console.log(`📥 Response Status: ${response.status}`);
      console.log(`📋 Response Data:`, JSON.stringify(response.data, null, 2));

      if (response.status === 429) {
        // Handle rate limiting
        const retryAfter = response.headers['retry-after'] || 5;
        await this.sleep(retryAfter * 1000);
        return this.request(method, endpoint, data, queryParams);
      }

      // Ensure consistent response structure for tests
      const responseData = response.data;

      // If response doesn't have items property, add it
      if (responseData && typeof responseData === 'object' && !responseData.hasOwnProperty('items')) {
        // Handle different response formats
        if (Array.isArray(responseData)) {
          return {
            items: responseData,
            total_count: responseData.length
          };
        } else {
          return {
            items: [],
            total_count: 0,
            ...responseData
          };
        }
      }

      return responseData;
    } catch (error) {
      console.error(`❌ Request Error:`, {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data || error.response?.body
      });
      
      this.handleError(error);

      // Return consistent error structure
      return {
        items: [],
        total_count: 0,
        error: true,
        message: error.message,
        status: error.response?.status,
        responseData: error.response?.data || error.response?.body
      };
    }
  }

  handleError(error) {
    if (error.response?.status === 401) {
      this.tokenManager.token = null;
    }
    throw error;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper method to build searchCriteria for Adobe Commerce APIs
  buildSearchCriteria(criteria = {}) {
    const searchCriteria = {
      searchCriteria: {
        filterGroups: [],
        sortOrders: [],
        pageSize: criteria.pageSize || 20,
        currentPage: criteria.currentPage || 1
      }
    };

    // Add filters
    if (criteria.filters && criteria.filters.length > 0) {
      criteria.filters.forEach(filter => {
        searchCriteria.searchCriteria.filterGroups.push({
          filters: [{
            field: filter.field,
            value: filter.value,
            conditionType: filter.conditionType || 'eq'
          }]
        });
      });
    }

    // Add sorting
    if (criteria.sortOrders && criteria.sortOrders.length > 0) {
      searchCriteria.searchCriteria.sortOrders = criteria.sortOrders.map(sort => ({
        field: sort.field,
        direction: sort.direction || 'ASC'
      }));
    }

    return searchCriteria;
  }

  // Convenience method for GET requests with searchCriteria
  async getWithSearch(endpoint, searchCriteria = {}) {
    const queryParams = this.buildSearchCriteria(searchCriteria);
    return this.request('GET', endpoint, null, queryParams);
  }

  // Convenience methods for common HTTP methods
  async get(endpoint, queryParams = {}) {
    return this.request('GET', endpoint, null, queryParams);
  }

  async post(endpoint, data = null) {
    return this.request('POST', endpoint, data);
  }

  async put(endpoint, data = null) {
    return this.request('PUT', endpoint, data);
  }

  async delete(endpoint) {
    return this.request('DELETE', endpoint);
  }
}

module.exports = ACCSApiClient;