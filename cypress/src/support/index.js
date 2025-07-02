import './deleteCustomer';
import './getUserTokenCookie';
import './waitForResource';
import './sessionStorage';
import './getIFrameField';
import './waitForImages';
import './interceptConfig';
import './waitForWishlistPage';

import registerCypressGrep from '@cypress/grep'
registerCypressGrep();

// Global error handling for unhandled promise rejections
Cypress.on('uncaught:exception', (err, runnable) => {
// Handle the specific "unknown error has occurred: null" issue
if (err.message && err.message.includes('An unknown error has occurred: null')) {
    console.log('Caught unhandled promise rejection with null value - continuing test');
    return false; // Prevent this error from failing the test
}

// Handle other common unhandled promise rejections from dropins
if (err.message && (
    err.message.includes('NetworkError') ||
    err.message.includes('fetch') ||
    err.message.includes('GraphQL') ||
    err.message.includes('null is not an object')
)) {
    console.log('Caught network/API related error - continuing test:', err.message);
    return false; // Prevent these errors from failing the test
}

// Let other uncaught exceptions fail the test
return true;
});