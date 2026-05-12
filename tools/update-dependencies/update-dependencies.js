/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Constants
const SUMMARY_WIDTH = 80;
const PACKAGE_JSON_PATH = path.join(__dirname, '..', '..', 'package.json');
// Scopes to check in package.json dependencies
const TRACKED_SCOPES = ['@adobe/', '@dropins/'];

// Check for flags
const DRY_RUN = process.argv.includes('--dry-run') || process.argv.includes('-d');

// Track all changes and lookup failures for summary
const changes = [];
const failures = [];
const heldPrereleases = [];

/**
 * Fetch data from a URL using https module
 */
const FETCH_TIMEOUT_MS = 10_000;
const FETCH_MAX_BYTES = 100 * 1024; // 100 KB is plenty for an npm registry metadata response

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let bytes = 0;
      let data = '';

      res.on('data', (chunk) => {
        bytes += chunk.length;
        if (bytes > FETCH_MAX_BYTES) {
          res.destroy(new Error(`Response from ${url} exceeded ${FETCH_MAX_BYTES} bytes`));
          return;
        }
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
        }
      });

      res.on('error', reject);
    });

    req.setTimeout(FETCH_TIMEOUT_MS, () => {
      req.destroy(new Error(`Request to ${url} timed out after ${FETCH_TIMEOUT_MS}ms`));
    });

    req.on('error', reject);
  });
}

/**
 * Get the latest stable version of a package from the npm registry.
 * Pre-release versions (alpha, beta, rc, etc.) are intentionally ignored
 * so customers always receive production-ready updates only.
 */
async function getLatestVersion(packageName) {
  try {
    const url = `https://registry.npmjs.org/${packageName}/latest`;
    const data = await fetchUrl(url);
    const json = JSON.parse(data);
    const { version } = json;

    if (!version) {
      failures.push({ package: packageName, reason: 'registry returned no version field' });
      return null;
    }

    // Reject any pre-release version the registry might return
    if (/-\w/.test(version)) {
      console.warn(`  Skipping pre-release version ${version} for ${packageName}`);
      return null;
    }

    return version;
  } catch (error) {
    failures.push({ package: packageName, reason: error.message });
    return null;
  }
}

/**
 * Compare version strings.
 * Returns true only when latest (always stable) is strictly newer than current.
 * Upgrading from a pre-release to the equivalent or higher stable is allowed.
 */
function compareVersions(current, latest) {
  const cleanCurrent = current.replace(/^v/, '');
  const cleanLatest = latest.replace(/^v/, '');

  if (cleanCurrent === cleanLatest) return false;

  const currentBase = cleanCurrent.split('-')[0];
  const currentParts = currentBase.split('.').map(Number);
  const latestParts = cleanLatest.split('.').map(Number);

  for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i += 1) {
    const cp = currentParts[i] || 0;
    const lp = latestParts[i] || 0;
    if (lp > cp) return true;
    if (lp < cp) return false;
  }

  // Base versions are equal: allow upgrade if current is a pre-release (e.g. 3.0.4-beta2 → 3.0.4)
  return /-\w/.test(cleanCurrent);
}

/**
 * Update @adobe/* and @dropins/* dependencies in package.json
 */
async function updatePackageJson() {
  console.log('\n=== Checking @adobe and @dropins packages in package.json ===\n');

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  let hasChanges = false;

  const dependencies = packageJson.dependencies || {};
  const tracked = Object.keys(dependencies).filter(
    (pkg) => TRACKED_SCOPES.some((scope) => pkg.startsWith(scope)),
  );

  if (tracked.length === 0) {
    console.log('No tracked packages found in package.json\n');
    return false;
  }

  console.log(`Found ${tracked.length} package(s) to check\n`);

  const results = await Promise.all(
    tracked.map(async (packageName) => {
      const rawVersion = dependencies[packageName];
      const currentVersion = rawVersion.replace(/^[~^]/, '');
      const latestVersion = await getLatestVersion(packageName);
      const isPrerelease = /-\w/.test(currentVersion);

      if (latestVersion && compareVersions(currentVersion, latestVersion)) {
        return {
          packageName, rawVersion, currentVersion, latestVersion, status: 'update',
        };
      }

      if (isPrerelease && latestVersion && !compareVersions(currentVersion, latestVersion)) {
        return {
          packageName, rawVersion, currentVersion, latestVersion, status: 'held',
        };
      }

      return { packageName, currentVersion, status: 'current' };
    }),
  );

  results
    .sort((a, b) => a.packageName.localeCompare(b.packageName))
    .forEach((result) => {
      const {
        packageName, currentVersion, latestVersion, status,
      } = result;
      const label = `  ${packageName}@${currentVersion}`;
      if (status === 'update') console.log(`${label}  →  ${latestVersion}`);
      else if (status === 'held') console.log(`${label}  held (latest stable ${latestVersion})`);
      else console.log(`${label}  (up to date)`);
    });

  results.filter((r) => r.status === 'held').forEach(({ packageName, currentVersion, latestVersion }) => {
    heldPrereleases.push({ package: packageName, current: currentVersion, stable: latestVersion });
  });

  results.filter((r) => r.status === 'update').forEach((result) => {
    const {
      packageName, rawVersion, currentVersion, latestVersion,
    } = result;
    changes.push({ package: packageName, from: currentVersion, to: latestVersion });
    const prefix = rawVersion.match(/^[~^]/)?.[0] ?? '~';
    dependencies[packageName] = `${prefix}${latestVersion}`;
    hasChanges = true;
  });

  if (hasChanges && !DRY_RUN) {
    packageJson.dependencies = dependencies;
    fs.writeFileSync(
      PACKAGE_JSON_PATH,
      `${JSON.stringify(packageJson, null, 2)}\n`,
      'utf-8',
    );
  }

  return hasChanges;
}

/**
 * Print a summary of all changes and failures
 */
function printSummary() {
  console.log(`\n${'='.repeat(SUMMARY_WIDTH)}`);
  console.log('SUMMARY');
  console.log(`${'='.repeat(SUMMARY_WIDTH)}\n`);

  if (changes.length === 0 && failures.length === 0 && heldPrereleases.length === 0) {
    console.log('All dependencies are up to date!\n');
    return;
  }

  if (heldPrereleases.length > 0) {
    console.log('Held pre-releases (stable version behind pre-release base — no change made):');
    console.log('─'.repeat(SUMMARY_WIDTH));
    heldPrereleases.forEach(({ package: pkg, current, stable }) => {
      console.log(`  ${pkg}`);
      console.log(`    current: ${current}  |  latest stable: ${stable}`);
    });
    console.log('');
  }

  if (changes.length > 0) {
    console.log('package.json updates:');
    console.log('─'.repeat(SUMMARY_WIDTH));
    changes.forEach(({ package: pkg, from, to }) => {
      console.log(`  ${pkg}`);
      console.log(`    ${from} → ${to}`);
    });
    console.log('');
    console.log(`Total updates: ${changes.length}\n`);
  }

  if (failures.length > 0) {
    console.error('Registry lookup failures:');
    console.error('─'.repeat(SUMMARY_WIDTH));
    failures.forEach(({ package: pkg, reason }) => {
      console.error(`  ${pkg}: ${reason}`);
    });
    console.error('');
    console.error('These packages were skipped. Results above may be incomplete.\n');
  }

  if (DRY_RUN) {
    console.log('DRY RUN MODE - No files were modified');
    console.log('Run without --dry-run to apply these changes\n');
  } else if (changes.length > 0) {
    console.log('Files updated successfully!\n');
  }
}

async function main() {
  if (DRY_RUN) {
    console.log('Running in DRY RUN mode - no files will be modified\n');
  }

  console.log('Checking for dependency updates...\n');

  try {
    await updatePackageJson();
    printSummary();

    if (failures.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('\nError during update:', error);
    process.exit(1);
  }
}

main();
