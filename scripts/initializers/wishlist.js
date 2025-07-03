import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-wishlist/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

// Add debug marker to page with timestamp
const addDebugMarker = (message, color = 'blue') => {
  if (typeof document !== 'undefined') {
    const timestamp = Date.now();
    const marker = document.createElement('div');
    marker.style.cssText = `position:fixed;top:0;left:0;z-index:9999;background:${color};color:white;padding:5px;font-size:12px;max-width:300px;`;
    marker.textContent = `INIT[${timestamp % 10000}]: ${message}`;
    document.body.appendChild(marker);
    
    // Also log to console for local debugging
    console.log(`🔍 WISHLIST DEBUG [${timestamp}]: ${message}`);
  }
};

addDebugMarker('Starting wishlist initializer', 'red');

await initializeDropin(async () => {
  addDebugMarker('Inside initializeDropin', 'orange');
  
  try {
    setFetchGraphQlHeaders(await getHeaders('wishlist'));
    addDebugMarker('Headers set', 'green');

    const labels = await fetchPlaceholders('placeholders/wishlist.json');
    addDebugMarker('Labels fetched', 'blue');
    
    const langDefinitions = {
      default: {
        ...labels,
      },
    };

    addDebugMarker('About to mountImmediately', 'purple');
    const result = initializers.mountImmediately(initialize, {
      langDefinitions,
      isGuestWishlistEnabled: true,
    });
    
    addDebugMarker('mountImmediately completed', 'green');
    return result;
  } catch (error) {
    addDebugMarker(`Error in initializeDropin: ${error.message}`, 'darkred');
    throw error;
  }
})();
