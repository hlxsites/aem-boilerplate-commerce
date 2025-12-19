/**
 * Address Autocomplete Service
 * Mock implementation for address lookup functionality
 * Replace with Google Places API, Loqate, SmartyStreets, or similar in production
 */

// =============================================================================
// MOCK ADDRESS DATABASE
// =============================================================================

/**
 * Mock address database with US addresses
 * Region format: "STATE_CODE,REGION_ID" (matches Adobe Commerce region format)
 */
const MOCK_ADDRESSES = [
  // New York
  {
    street: '123 Main Street',
    street2: 'Apt 4B',
    city: 'New York',
    region: 'NY,129',
    regionName: 'New York',
    postcode: '10001',
    country: 'US',
  },
  {
    street: '456 5th Avenue',
    street2: '',
    city: 'New York',
    region: 'NY,129',
    regionName: 'New York',
    postcode: '10018',
    country: 'US',
  },
  {
    street: '789 Brooklyn Bridge Blvd',
    street2: 'Unit 12',
    city: 'Brooklyn',
    region: 'NY,129',
    regionName: 'New York',
    postcode: '11201',
    country: 'US',
  },
  // California
  {
    street: '456 Oak Avenue',
    street2: '',
    city: 'Los Angeles',
    region: 'CA,36',
    regionName: 'California',
    postcode: '90001',
    country: 'US',
  },
  {
    street: '555 Market Street',
    street2: 'Floor 3',
    city: 'San Francisco',
    region: 'CA,36',
    regionName: 'California',
    postcode: '94102',
    country: 'US',
  },
  {
    street: '1000 Hollywood Boulevard',
    street2: '',
    city: 'Hollywood',
    region: 'CA,36',
    regionName: 'California',
    postcode: '90028',
    country: 'US',
  },
  {
    street: '200 Santa Monica Pier',
    street2: '',
    city: 'Santa Monica',
    region: 'CA,36',
    regionName: 'California',
    postcode: '90401',
    country: 'US',
  },
  // Illinois
  {
    street: '789 Pine Road',
    street2: 'Suite 100',
    city: 'Chicago',
    region: 'IL,69',
    regionName: 'Illinois',
    postcode: '60601',
    country: 'US',
  },
  {
    street: '333 Michigan Avenue',
    street2: '',
    city: 'Chicago',
    region: 'IL,69',
    regionName: 'Illinois',
    postcode: '60604',
    country: 'US',
  },
  // Texas
  {
    street: '321 Elm Boulevard',
    street2: '',
    city: 'Houston',
    region: 'TX,171',
    regionName: 'Texas',
    postcode: '77001',
    country: 'US',
  },
  {
    street: '500 Congress Avenue',
    street2: 'Suite 200',
    city: 'Austin',
    region: 'TX,171',
    regionName: 'Texas',
    postcode: '78701',
    country: 'US',
  },
  {
    street: '1500 Main Street',
    street2: '',
    city: 'Dallas',
    region: 'TX,171',
    regionName: 'Texas',
    postcode: '75201',
    country: 'US',
  },
  // Washington
  {
    street: '888 Broadway',
    street2: '',
    city: 'Seattle',
    region: 'WA,186',
    regionName: 'Washington',
    postcode: '98101',
    country: 'US',
  },
  {
    street: '400 Pike Place',
    street2: '',
    city: 'Seattle',
    region: 'WA,186',
    regionName: 'Washington',
    postcode: '98101',
    country: 'US',
  },
  // Washington DC
  {
    street: '1200 Pennsylvania Avenue',
    street2: '',
    city: 'Washington',
    region: 'DC,48',
    regionName: 'District of Columbia',
    postcode: '20004',
    country: 'US',
  },
  {
    street: '1600 Pennsylvania Avenue',
    street2: '',
    city: 'Washington',
    region: 'DC,48',
    regionName: 'District of Columbia',
    postcode: '20500',
    country: 'US',
  },
  // Florida
  {
    street: '42 Sunset Strip',
    street2: 'Unit 7',
    city: 'Miami',
    region: 'FL,54',
    regionName: 'Florida',
    postcode: '33101',
    country: 'US',
  },
  {
    street: '100 Ocean Drive',
    street2: '',
    city: 'Miami Beach',
    region: 'FL,54',
    regionName: 'Florida',
    postcode: '33139',
    country: 'US',
  },
  {
    street: '1 Magic Way',
    street2: '',
    city: 'Orlando',
    region: 'FL,54',
    regionName: 'Florida',
    postcode: '32830',
    country: 'US',
  },
  // Massachusetts
  {
    street: '1 Beacon Street',
    street2: '',
    city: 'Boston',
    region: 'MA,96',
    regionName: 'Massachusetts',
    postcode: '02108',
    country: 'US',
  },
  {
    street: '77 Massachusetts Avenue',
    street2: '',
    city: 'Cambridge',
    region: 'MA,96',
    regionName: 'Massachusetts',
    postcode: '02139',
    country: 'US',
  },
  // Arizona
  {
    street: '2000 E Camelback Road',
    street2: 'Suite 100',
    city: 'Phoenix',
    region: 'AZ,12',
    regionName: 'Arizona',
    postcode: '85016',
    country: 'US',
  },
  // Nevada
  {
    street: '3570 Las Vegas Boulevard',
    street2: '',
    city: 'Las Vegas',
    region: 'NV,117',
    regionName: 'Nevada',
    postcode: '89109',
    country: 'US',
  },
  // Colorado
  {
    street: '1701 Wynkoop Street',
    street2: '',
    city: 'Denver',
    region: 'CO,39',
    regionName: 'Colorado',
    postcode: '80202',
    country: 'US',
  },
  // Georgia
  {
    street: '250 Peachtree Street',
    street2: 'Floor 15',
    city: 'Atlanta',
    region: 'GA,57',
    regionName: 'Georgia',
    postcode: '30303',
    country: 'US',
  },
];

/**
 * Generate display text for an address
 * @param {Object} address - Address object
 * @returns {string} - Formatted display text
 */
const getDisplayText = (address) => {
  const parts = [address.street];
  if (address.street2) parts.push(address.street2);
  parts.push(address.city);

  // Extract state code from region (e.g., "NY,129" -> "NY")
  const stateCode = address.region.split(',')[0];
  parts.push(`${stateCode} ${address.postcode}`);

  return parts.join(', ');
};

// =============================================================================
// SEARCH FUNCTIONALITY
// =============================================================================

/**
 * Search addresses based on query
 * Searches across street, city, region/state, and postcode
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results (default: 5)
 * @returns {Array} - Matching addresses with displayText added
 */
export const searchAddresses = (query, limit = 5) => {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);

  // Score-based matching for better results
  const scoredResults = MOCK_ADDRESSES.map((address) => {
    let score = 0;
    const searchableText = [
      address.street,
      address.street2,
      address.city,
      address.regionName,
      address.region.split(',')[0], // State code
      address.postcode,
    ].join(' ').toLowerCase();

    // Check if all query words are found
    const allWordsFound = queryWords.every((word) => searchableText.includes(word));
    if (!allWordsFound) return null;

    // Score based on match quality
    queryWords.forEach((word) => {
      // Exact word match in street
      if (address.street.toLowerCase().includes(word)) score += 3;
      // City match
      if (address.city.toLowerCase().includes(word)) score += 2;
      // Region/State match
      if (address.regionName.toLowerCase().includes(word)) score += 2;
      if (address.region.split(',')[0].toLowerCase() === word) score += 2;
      // Postcode match
      if (address.postcode.includes(word)) score += 3;
    });

    return { address, score };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ address }) => ({
      ...address,
      displayText: getDisplayText(address),
    }));

  return scoredResults;
};

// =============================================================================
// AUTOCOMPLETE UI COMPONENT
// =============================================================================

/**
 * Creates and manages the address autocomplete dropdown UI
 * @param {HTMLElement} inputElement - The address lookup input
 * @param {HTMLElement} formContainer - The form container to populate
 * @param {HTMLElement} addressWrapper - The wrapper element for toggling
 * @param {HTMLElement} toggleBtn - The toggle button element
 * @returns {Object} - Autocomplete controller with destroy method
 */
export const createAddressAutocomplete = (
  inputElement,
  formContainer,
  addressWrapper,
  toggleBtn,
) => {
  let suggestionsContainer = null;
  let debounceTimer = null;
  let selectedIndex = -1;

  // Create suggestions dropdown
  const createSuggestionsContainer = () => {
    const container = document.createElement('div');
    container.className = 'address-autocomplete-suggestions';
    container.setAttribute('role', 'listbox');
    container.setAttribute('aria-label', 'Address suggestions');
    return container;
  };

  // Create a single suggestion item
  const createSuggestionItem = (address, index, onSelect) => {
    const item = document.createElement('div');
    item.className = 'address-autocomplete-suggestion';
    item.setAttribute('role', 'option');
    item.setAttribute('data-index', index);

    // Extract state code for display
    const stateCode = address.region.split(',')[0];

    item.innerHTML = `
      <div class="address-autocomplete-suggestion__content">
        <svg class="address-autocomplete-suggestion__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <div class="address-autocomplete-suggestion__text">
          <span class="address-autocomplete-suggestion__street">${address.street}${address.street2 ? `, ${address.street2}` : ''}</span>
          <span class="address-autocomplete-suggestion__location">${address.city}, ${stateCode} ${address.postcode}</span>
        </div>
      </div>
    `;

    item.addEventListener('click', () => onSelect(address));

    return item;
  };

  // Populate form fields with selected address
  const populateFormFields = (address) => {
    const fieldMappings = {
      street: '[name="street"]',
      street2: '[name="streetMultiline_2"]',
      city: '[name="city"]',
      region: '[name="region"]',
      postcode: '[name="postcode"]',
      country: '[name="countryCode"]',
    };

    Object.entries(fieldMappings).forEach(([key, selector]) => {
      const field = formContainer.querySelector(selector);
      if (field && address[key]) {
        // For select elements, we need to find the matching option
        if (field.tagName === 'SELECT') {
          const options = Array.from(field.options);
          const matchingOption = options.find((opt) => opt.value === address[key] || opt.value.startsWith(address[key].split(',')[0]));
          if (matchingOption) {
            field.value = matchingOption.value;
          }
        } else {
          field.value = address[key];
        }

        // Trigger events to notify the form
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  };

  // Handle address selection
  const handleAddressSelect = (address) => {
    // Expand the form first if not already expanded
    if (!addressWrapper.classList.contains('checkout-address-address-wrapper--expanded')) {
      toggleBtn.click();
    }

    // Delay to ensure form is expanded before populating
    setTimeout(() => {
      populateFormFields(address);
      inputElement.value = '';
      hideSuggestions();
      inputElement.blur();
    }, 100);
  };

  // Show suggestions
  const showSuggestions = (addresses) => {
    if (!suggestionsContainer) {
      suggestionsContainer = createSuggestionsContainer();
      const inputWrapper = inputElement.closest('.dropin-input-label-container');
      if (inputWrapper) {
        inputWrapper.style.position = 'relative';
        inputWrapper.appendChild(suggestionsContainer);
      }
    }

    suggestionsContainer.innerHTML = '';
    selectedIndex = -1;

    if (addresses.length === 0) {
      // Show "no results" message
      const noResults = document.createElement('div');
      noResults.className = 'address-autocomplete-no-results';
      noResults.textContent = 'No addresses found. Try a different search or enter manually.';
      suggestionsContainer.appendChild(noResults);
      suggestionsContainer.style.display = 'block';
      return;
    }

    addresses.forEach((address, index) => {
      suggestionsContainer.appendChild(
        createSuggestionItem(address, index, handleAddressSelect),
      );
    });

    suggestionsContainer.style.display = 'block';
  };

  // Hide suggestions
  const hideSuggestions = () => {
    if (suggestionsContainer) {
      suggestionsContainer.style.display = 'none';
      selectedIndex = -1;
    }
  };

  // Update selected item highlight
  const updateSelection = (newIndex, items) => {
    items.forEach((item, i) => {
      item.classList.toggle('address-autocomplete-suggestion--selected', i === newIndex);
      item.setAttribute('aria-selected', i === newIndex ? 'true' : 'false');
    });
    selectedIndex = newIndex;
  };

  // Handle keyboard navigation
  const handleKeydown = (e) => {
    if (!suggestionsContainer || suggestionsContainer.style.display === 'none') return;

    const items = suggestionsContainer.querySelectorAll('.address-autocomplete-suggestion');
    if (items.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        updateSelection(
          selectedIndex < items.length - 1 ? selectedIndex + 1 : 0,
          items,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        updateSelection(
          selectedIndex > 0 ? selectedIndex - 1 : items.length - 1,
          items,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && items[selectedIndex]) {
          items[selectedIndex].click();
        }
        break;
      case 'Escape':
        hideSuggestions();
        break;
      default:
        break;
    }
  };

  // Handle input changes with debounce
  const handleInput = (e) => {
    const query = e.target.value;

    clearTimeout(debounceTimer);

    if (query.length < 2) {
      hideSuggestions();
      return;
    }

    debounceTimer = setTimeout(() => {
      const results = searchAddresses(query);
      showSuggestions(results);
    }, 200);
  };

  // Handle click outside to close suggestions
  const handleClickOutside = (e) => {
    if (!inputElement.contains(e.target) && !suggestionsContainer?.contains(e.target)) {
      hideSuggestions();
    }
  };

  // Attach event listeners
  inputElement.addEventListener('input', handleInput);
  inputElement.addEventListener('keydown', handleKeydown);
  inputElement.addEventListener('focus', () => {
    if (inputElement.value.length >= 2) {
      const results = searchAddresses(inputElement.value);
      showSuggestions(results);
    }
  });
  document.addEventListener('click', handleClickOutside);

  // Return controller
  return {
    destroy: () => {
      inputElement.removeEventListener('input', handleInput);
      inputElement.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(debounceTimer);
      if (suggestionsContainer) {
        suggestionsContainer.remove();
      }
    },
  };
};

export default {
  searchAddresses,
  createAddressAutocomplete,
};

