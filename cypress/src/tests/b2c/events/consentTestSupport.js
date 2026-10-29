/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Grants consent before each document's application scripts run in analytics tests.
 * The URL override is reapplied on full navigations and reloads; consent.spec.js
 * intentionally does not use this helper because it tests the load-time gate.
 */
export function enableAnalyticsConsent() {
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      const url = new URL(win.location.href);
      url.searchParams.set('consent', 'accept');
      win.history.replaceState(null, '', url.toString());
    });
  });
}

export function waitForAnalyticsConsent() {
  return cy.window().should((win) => {
    expect(win.magentoStorefrontEvents?.publish?.pageView, 'analytics SDK executed')
      .to.be.a('function');
    expect(win.adobeDataLayer.getState('eventForwardingContext')?.commerce,
      'Commerce forwarding initialized').to.equal(true);
  });
}

export function visitWithAnalyticsConsent(url, options = {}) {
  cy.visit(url, { ...options, qs: { ...options.qs, consent: 'accept' } });
  return waitForAnalyticsConsent();
}