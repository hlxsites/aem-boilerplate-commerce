/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { createExtensionManager } from '@dropins/tools/lib.js';
import extensions from './extensions/index.js';

// Singleton — initialized on first call, reused thereafter
let managerPromise = null;

export function getExtensionManager() {
  if (!managerPromise) {
    managerPromise = createExtensionManager(extensions);
  }
  return managerPromise;
}
