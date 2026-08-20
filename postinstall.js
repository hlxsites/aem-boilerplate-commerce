const fs = require('fs');
const path = require('path');

const { dependencies } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Define the dropins folder
const dropinsDir = path.join('scripts', '__dropins__');

// Remove existing dropins folder
if (fs.existsSync(dropinsDir)) {
  fs.rmSync(dropinsDir, { recursive: true });
}

// Create scripts/__dropins__ directory if not exists
fs.mkdirSync(dropinsDir, { recursive: true });

// Read package-lock.json to get the expected resolved versions
const packageLock = JSON.parse(fs.readFileSync('./package-lock.json', 'utf8'));

// Verify that every @dropins/* dependency in node_modules matches the version
// declared in package-lock.json. A mismatch means `npm install` did not
// reconcile node_modules correctly (e.g. stale prerelease version) and
// vendoring would silently ship the wrong dropin code.
const versionMismatches = [];

// Copy specified files from node_modules/@dropins to scripts/__dropins__
fs.readdirSync('node_modules/@dropins', { withFileTypes: true }).forEach((file) => {
  // Skip if package is not in package.json dependencies / skip devDependencies
  if (!dependencies[`@dropins/${file.name}`]) {
    return;
  }

  // Skip if is not folder
  if (!file.isDirectory()) {
    return;
  }

  // Check installed version against package-lock.json
  const pkgName = `@dropins/${file.name}`;
  const installedPkgPath = path.join('node_modules', '@dropins', file.name, 'package.json');
  if (fs.existsSync(installedPkgPath)) {
    const installedVersion = JSON.parse(fs.readFileSync(installedPkgPath, 'utf8')).version;
    const lockEntry = packageLock.packages[`node_modules/${pkgName}`];
    const expectedVersion = lockEntry && lockEntry.version;
    if (expectedVersion && installedVersion !== expectedVersion) {
      versionMismatches.push({ pkgName, installedVersion, expectedVersion });
    }
  }

  fs.cpSync(path.join('node_modules', '@dropins', file.name), path.join(dropinsDir, file.name), {
    recursive: true,
    filter: (src) => (!src.endsWith('package.json')),
  });
});

if (versionMismatches.length > 0) {
  console.error('\n🚨 Drop-in version mismatch detected!\n');
  console.error('The following packages in node_modules do not match package-lock.json:');
  versionMismatches.forEach(({ pkgName, installedVersion, expectedVersion }) => {
    console.error(`  ${pkgName}: installed ${installedVersion}, expected ${expectedVersion}`);
  });
  console.error('\nRun "rm -rf node_modules && npm install" to fix this.\n');
  process.exit(1);
}

// Other files to copy
[
  { from: '@adobe/magento-storefront-event-collector/dist/index.js', to: 'commerce-events-collector.js' },
  { from: '@adobe/magento-storefront-events-sdk/dist/index.js', to: 'commerce-events-sdk.js' },
  { from: '@adobe/adobe-client-data-layer/dist/adobe-client-data-layer.min.js', to: 'acdl/adobe-client-data-layer.min.js' },
  { from: '@adobe/adobe-client-data-layer/dist/adobe-client-data-layer.min.js.map', to: 'acdl/adobe-client-data-layer.min.js.map' },
].forEach((file) => {
  fs.copyFileSync(path.resolve(__dirname, 'node_modules', file.from), path.resolve(__dirname, 'scripts', file.to));
});

function checkPackageLockForArtifactory() {
  return new Promise((resolve, reject) => {
    fs.readFile('package-lock.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const lockData = JSON.parse(data);
        let found = false;
        Object.keys(lockData.packages).forEach((packageName) => {
          const packageInfo = lockData.packages[packageName];
          if (packageInfo.resolved && packageInfo.resolved.includes('artifactory')) {
            console.warn(`Warning: artifactory found in resolved property for package ${packageName}`);
            found = true;
          }
        });
        resolve(found);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function checkSourceMaps() {
  const hlxIgnorePath = '.hlxignore';
  if (!fs.existsSync(hlxIgnorePath) || !fs.readFileSync(hlxIgnorePath, 'utf-8').includes('*.map')) {
    console.info('⚠️ Sourcemaps may be added to the repo. WARNING: Please remove the *.map files or add "*.map" to .hlxignore before going live!\n');
  }
}

checkSourceMaps();

checkPackageLockForArtifactory()
  .then((found) => {
    if (!found) {
      console.info('✅ Drop-ins installed successfully!', '\n');
      process.exit(0);
    } else {
      console.error('🚨 Fix artifactory references before committing! 🚨');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
