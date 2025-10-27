/**
 * Set Shipping Address Button Block
 * 
 * This block creates a test button that calls the setShippingAddress API
 * with a hardcoded address. It serves as a reference implementation for
 * developers integrating the shipping address feature.
 */

import { setShippingAddress } from '@dropins/quote-management/api.js';

/**
 * Hardcoded test address for demonstration purposes.
 * In a production application, this would come from a proper address
 * selection UI (e.g., Account Drop-in address selector).
 */
const TEST_ADDRESS = {
  firstname: 'John',
  lastname: 'Doe',
  company: 'Adobe Inc.',
  street: ['345 Park Avenue'],
  city: 'San Jose',
  region: 'CA',
  postcode: '95110',
  countryCode: 'US',
  telephone: '555-0123',
  saveInAddressBook: false,
};

/**
 * Decorates a button element with shipping address functionality.
 * 
 * @param {HTMLElement} element - The button element to decorate
 */
export default function decorateSetShippingAddressButton(element) {
  element.textContent = 'Set Test Shipping Address';
  
  element.addEventListener('click', async () => {
    // Get quote ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const quoteId = urlParams.get('quoteId');
    
    // Validate that a quote is selected
    if (!quoteId) {
      alert('No active quote selected. Please navigate to a quote first.');
      return;
    }
    
    // Show loading state
    element.disabled = true;
    const originalText = element.textContent;
    element.textContent = '⏳ Setting address...';
    
    try {
      // Call the setShippingAddress API with hardcoded test data
      const updatedQuote = await setShippingAddress({
        quoteUid: quoteId,
        addressData: TEST_ADDRESS,
      });
      
      // Success feedback
      element.textContent = '✅ Address Set Successfully';
      console.log('✅ Shipping address updated successfully');
      console.log('Updated quote:', updatedQuote);
      
      // Reset button after 2 seconds
      setTimeout(() => {
        element.disabled = false;
        element.textContent = originalText;
      }, 2000);
      
    } catch (error) {
      // Error feedback
      element.textContent = '❌ Failed';
      console.error('❌ Error setting shipping address:', error);
      
      // Show user-friendly error message
      alert(`Failed to set shipping address: ${error.message}`);
      
      // Reset button after 2 seconds
      setTimeout(() => {
        element.disabled = false;
        element.textContent = originalText;
      }, 2000);
    }
  });
}

