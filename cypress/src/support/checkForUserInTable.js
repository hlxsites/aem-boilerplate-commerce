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

/**
 * @fileoverview Helper command to check for user in Company Users table.
 * Handles backend cache issues (USF-3516) with retry logic and page reloads.
 */

/**
 * Check for user in Company Users table with retry logic
 * @param {string} userEmail - The email of the user to find
 * @param {string} expectedStatus - Expected status (e.g., 'Active', 'Inactive')
 * @param {number} maxRetries - Maximum number of retries (default: 5)
 */
Cypress.Commands.add('checkForUserInTable', (userEmail, expectedStatus = null, maxRetries = 5) => {
  let retries = 0;

  function attemptFind() {
    // Wait for table to be fully loaded
    cy.get('.companyUsersTable', { timeout: 15000 }).should('be.visible');
    cy.get('[aria-busy="true"]', { timeout: 10000 }).should('not.exist');
    cy.wait(1000);

    // Check specifically within the table
    cy.get('.companyUsersTable').then(($table) => {
      if ($table.text().includes(userEmail)) {
        cy.logToTerminal(`✅ User found in grid: ${userEmail}`);
        
        // Verify user is actually visible in the table
        if (expectedStatus) {
          cy.get('.companyUsersTable')
            .contains(userEmail)
            .should('be.visible')
            .parents('tr')
            .within(() => {
              cy.contains(new RegExp(expectedStatus, 'i'), { timeout: 5000 }).should('be.visible');
            });
        } else {
          cy.get('.companyUsersTable').contains(userEmail).should('be.visible');
        }
      } else if (retries < maxRetries) {
        retries++;
        cy.logToTerminal(`⏳ User not yet visible, retrying (${retries}/${maxRetries})...`);
        cy.wait(8000); // Wait for backend cache to expire
        cy.reload();
        cy.wait(2000);
        
        attemptFind(); // Recursive retry
      } else {
        throw new Error(`User ${userEmail} not found in table after ${maxRetries} retries (USF-3516 cache issue)`);
      }
    });
  }

  cy.logToTerminal(`⏳ Checking for user in grid: ${userEmail}${expectedStatus ? ` (status: ${expectedStatus})` : ''}...`);
  attemptFind();
});

