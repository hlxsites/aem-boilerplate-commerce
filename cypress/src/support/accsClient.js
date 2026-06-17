// accsClient.js
const httpClient = require('./httpClient');
const TokenManager = require('./tokenManager');

class ACCSApiClient {
    constructor() {
        const rawEndpoint = (Cypress.env("API_ENDPOINT") || '').replace(/\/+$/, '');
        this.adminUsername = Cypress.env("COMMERCE_ADMIN_USERNAME");
        this.adminPassword = Cypress.env("COMMERCE_ADMIN_PASSWORD");
        // IS_ACO=true → admin-token auth under /rest/default; false/absent → SaaS IMS auth
        this.isAco = Cypress.env("IS_ACO") === true;

        this.baseURL = this.isAco ? `${rawEndpoint}/rest/default` : rawEndpoint;

        if (!this.isAco) {
            this.tokenManager = new TokenManager();
        }
        this.adminToken = null;
    }

    async getAccessToken() {
        if (!this.isAco) {
            return this.tokenManager.getValidToken();
        }

        if (this.adminToken) {
            return this.adminToken;
        }

        const response = await httpClient({
            method: 'POST',
            url: `${this.baseURL}/V1/integration/admin/token`,
            headers: { 'Content-Type': 'application/json' },
            data: { username: this.adminUsername, password: this.adminPassword },
            validateStatus: status => status < 500,
        });

        if (typeof response.data !== 'string') {
            throw new Error(`Admin token request failed: ${JSON.stringify(response.data)}`);
        }

        this.adminToken = response.data;
        return this.adminToken;
    }

    async request(method, endpoint, data = null, queryParams = {}) {
        const accessToken = await this.getAccessToken();

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };

        if (!this.isAco) {
            headers['x-api-key'] = Cypress.env("IMS_CLIENT_ID");
            headers['x-gw-ims-org-id'] = Cypress.env("IMS_ORG_ID");
        }

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

        try {
            const response = await httpClient({
                method,
                url,
                headers,
                data,
                validateStatus: status => status < 500
            });

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
            this.handleError(error);

            // Return consistent error structure
            return {
                items: [],
                total_count: 0,
                error: true,
                message: error.message,
                status: error.response?.status
            };
        }
    }

    handleError(error) {
        if (error.response?.status === 401) {
            if (this.isAco) {
                this.adminToken = null;
            } else {
                this.tokenManager.token = null;
            }
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
