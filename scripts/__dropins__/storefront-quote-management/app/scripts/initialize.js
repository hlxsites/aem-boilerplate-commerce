import {
    removeFetchGraphQlHeader,
    setEndpoint,
    setFetchGraphQlHeader,
} from '@dropins/tools/fetch-graphql.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize as authInitializer, removeFetchGraphQlHeader as authRemoveFetchGraphQlHeader } from '@dropins/storefront-auth/api.js';
import { initialize as cartInitializer } from '@dropins/storefront-cart/api.js';
import { initialize as quoteManagementInitializer } from '@dropins/quote-management/api.js';
import { getCookie } from '@dropins/tools/lib.js';
import { refreshCart } from '@dropins/storefront-cart/api.js';

// Luma Endpoint - https://b2b-gncyehq-dsd5h5jrkyufa.us-5.magentosite.cloud/graphql
const B2B_ENDPOINT = 'https://na1-qa.api.commerce.adobe.com/EHmNAqPgM7oUoCg2wEfEod/graphql';

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');


const setAuthHeaders = (state) => {
    if (state) {
        const token = getUserTokenCookie();
        setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
    } else {
        removeFetchGraphQlHeader('Authorization');
        authRemoveFetchGraphQlHeader('Authorization');
    }
};

const initializeAuth = () => {
    const config = {};
    initializers.mountImmediately(authInitializer, config);
}

const initializeQuoteManagement = () => {
    // Get the quote id from the url
    const quoteId = new URLSearchParams(window.location.search).get('quoteId');

    const config = {
        quoteId,
    };
    initializers.mountImmediately(quoteManagementInitializer, config);
}

const initializeCart = () => {
    const config = {};
    initializers.mountImmediately(cartInitializer, config);
}

export async function initialize() {
    // Initialize GraphQl Client (Mesh)
    setEndpoint(B2B_ENDPOINT);

    // on page load, check if user is authenticated
    const token = getUserTokenCookie();
    // set auth headers
    setAuthHeaders(!!token);

    /* Event listeners */

    // Set auth headers on authenticated event
    events.on('authenticated', setAuthHeaders);
     
    // Refresh cart when a negotiable quote is requested
    events.on('quote-management/negotiable-quote-requested', () => {
        refreshCart();
    });

    /* Initializers */
    initializeAuth();
    initializeQuoteManagement();
    initializeCart();
}