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

let collectionAllowed = () => false;
let initialized = false;
let capturingAuthorizedEvents = false;
let authorizedEvents = [];
const configuredSubscriptions = new WeakSet();

export function initializeAnalyticsEvents(isAllowed) {
  if (initialized) return;
  initialized = true;
  collectionAllowed = isAllowed;
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push((dataLayer) => {
    dataLayer.addEventListener('adobeDataLayer:event', (event) => {
      if (capturingAuthorizedEvents && collectionAllowed()) authorizedEvents.push(event);
    }, { scope: 'future' });
  });
  window.addEventListener('consent.update', () => {
    if (!collectionAllowed()) authorizedEvents = [];
  });
}

/** Buffer consented ACDL events temporarily while the SDK and collector load. */
export function startAnalyticsEventCapture() {
  authorizedEvents = [];
  capturingAuthorizedEvents = collectionAllowed();
}

/** Stop buffering and release the temporary events after collector setup. */
export function finishAnalyticsEventCapture() {
  capturingAuthorizedEvents = false;
  authorizedEvents = [];
}

export function configureAnalyticsSubscriptions(sdk) {
  if (configuredSubscriptions.has(sdk)) return;
  configuredSubscriptions.add(sdk);
  const handlers = new WeakMap();
  const subscriptions = Object.create(sdk.subscribe);
  subscriptions.addEventListener = (name, handler, options = {}) => {
    let registeredHandlers = handlers.get(handler);
    if (!registeredHandlers) {
      registeredHandlers = new Map();
      handlers.set(handler, registeredHandlers);
    }
    let guardedHandler = registeredHandlers.get(name);
    if (!guardedHandler) {
      guardedHandler = (event) => {
        if (collectionAllowed()) handler(event);
      };
      registeredHandlers.set(name, guardedHandler);
    }
    window.adobeDataLayer.push((dataLayer) => {
      if (options.scope !== 'past') {
        dataLayer.addEventListener(name, guardedHandler, { ...options, scope: 'future' });
      }
      if (options.scope !== 'future' && collectionAllowed()) {
        authorizedEvents.filter((event) => event.event === name).forEach((event) => {
          guardedHandler(structuredClone(event));
        });
      }
    });
  };
  sdk.subscribe = subscriptions;
  if (sdk.unsubscribe) {
    const originalUnsubscriptions = sdk.unsubscribe;
    const unsubscriptions = Object.create(originalUnsubscriptions);
    unsubscriptions.removeEventListener = (name, handler) => {
      const guardedHandler = handlers.get(handler)?.get(name);
      if (guardedHandler) {
        window.adobeDataLayer.push((dataLayer) => {
          dataLayer.removeEventListener(name, guardedHandler);
        });
        handlers.get(handler).delete(name);
      } else {
        originalUnsubscriptions.removeEventListener(name, handler);
      }
    };
    sdk.unsubscribe = unsubscriptions;
  }
}
