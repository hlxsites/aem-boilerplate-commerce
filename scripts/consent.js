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

export const CONSENT_TOPICS = Object.freeze({
  COLLECTION: 'commerce-collection',
  RECOMMENDATIONS: 'commerce-recommendations',
});

const topics = new Set(Object.values(CONSENT_TOPICS));
let consented = false;

/**
 * Returns global consent when the topic is omitted or empty, or consent for a
 * recognized Commerce topic. Invalid and unknown topics are denied.
 * @param {string} [topic=''] Topic identifier, or an empty string for global consent.
 * @returns {boolean} Whether the requested consent has been granted.
 * @todo SI: Replace or connect the consent-check.js testing placeholder to the
 * merchant's CMP so it emits consent.update with the agreed global boolean.
 * Map separate CMP categories to Commerce topics only if the CMP provides them.
 */
export function getConsent(topic = '') {
  if (topic === '') {
    return consented;
  }
  return topics.has(topic) && consented;
}

window.addEventListener('consent.update', (event) => {
  consented = event.detail?.consented === true;
});
