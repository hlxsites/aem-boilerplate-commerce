/**
 * Copyright 2025 Adobe
 * All Rights Reserved.
 */

/**
 * To avoid executing requests every time the Personalisation category is selected,
 * the result is cached and re-used.
 *
 * In order to clear teh cache (eg. when new rule or segment was added to the backend), there is
 * 'Refresh' button added to the plugin
 */
const queryCache = {
  catalogRules: [],
  cartRules: [],
  customerSegments: [],
  customerGroups: [],
}

export default queryCache;