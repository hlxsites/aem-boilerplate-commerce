/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

import { render as provider } from '@dropins/storefront-company-management/render.js';
import { CompanyHierarchy } from '@dropins/storefront-company-management/containers/CompanyHierarchy.js';
import { checkIsAuthenticated, rootLink, CUSTOMER_LOGIN_PATH } from '../../scripts/commerce.js';

// Initialize dropins
import '../../scripts/initializers/company.js';

export default async function decorate(block) {
  block.classList.add('commerce-company-hierarchy-container');

  if (!checkIsAuthenticated()) {
    window.location.href = rootLink(CUSTOMER_LOGIN_PATH);
  } else {
    await provider.render(CompanyHierarchy)(block);
  }
}
