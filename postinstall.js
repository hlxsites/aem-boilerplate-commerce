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

// Verify installed @dropins/* versions match package-lock.json before vendoring.
// A mismatch means node_modules is stale and copying would ship wrong code.
const packageLock = JSON.parse(fs.readFileSync('./package-lock.json', 'utf8'));
const versionMismatches = [];
const installedVersions = {};

fs.readdirSync('node_modules/@dropins', { withFileTypes: true }).forEach((entry) => {
  const pkgName = `@dropins/${entry.name}`;
  if (!entry.isDirectory() || !dependencies[pkgName]) return;

  const installedPkgPath = path.join('node_modules', '@dropins', entry.name, 'package.json');
  if (!fs.existsSync(installedPkgPath)) return;

  const installedVersion = JSON.parse(fs.readFileSync(installedPkgPath, 'utf8')).version;
  installedVersions[pkgName] = installedVersion;
  const lockEntry = packageLock.packages[`node_modules/${pkgName}`];
  if (lockEntry && lockEntry.version && installedVersion !== lockEntry.version) {
    versionMismatches.push({ pkgName, installedVersion, expected: lockEntry.version });
  }
});

if (versionMismatches.length > 0) {
  console.error('\n🚨 Drop-in version mismatch detected!\n');
  console.error('The following packages in node_modules do not match package-lock.json:');
  versionMismatches.forEach(({ pkgName, installedVersion, expected }) => {
    console.error(`  ${pkgName}: installed ${installedVersion}, expected ${expected}`);
  });
  console.error('\nRun "rm -rf node_modules && npm install" to fix this.\n');
  process.exit(1);
}

// `@dropins/tools` is always served locally (never moved to the CDN), so it's
// vendored in full. Every other dropin is served from the App Builder CDN --
// only its (build.mjs-patched) fragments.js needs to live locally, since the
// import map redirects that one file back here.
fs.readdirSync('node_modules/@dropins', { withFileTypes: true }).forEach((file) => {
  const pkgName = `@dropins/${file.name}`;

  // Skip if package is not in package.json dependencies / skip devDependencies
  if (!dependencies[pkgName]) {
    return;
  }

  // Skip if is not folder
  if (!file.isDirectory()) {
    return;
  }

  const srcDir = path.join('node_modules', '@dropins', file.name);

  if (pkgName === '@dropins/tools') {
    fs.cpSync(srcDir, path.join(dropinsDir, file.name), {
      recursive: true,
      filter: (src) => (!src.endsWith('package.json')),
    });
    return;
  }

  const fragmentsSrc = path.join(srcDir, 'fragments.js');
  if (!fs.existsSync(fragmentsSrc)) {
    return;
  }

  const destDir = path.join(dropinsDir, file.name);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(fragmentsSrc, path.join(destDir, 'fragments.js'));
  const fragmentsMapSrc = `${fragmentsSrc}.map`;
  if (fs.existsSync(fragmentsMapSrc)) {
    fs.copyFileSync(fragmentsMapSrc, path.join(destDir, 'fragments.js.map'));
  }
});

// Keep head.html's import map in sync with the versions just installed --
// each CDN-hosted dropin's URL includes its version, so a version bump only
// requires `npm install`, not a manual head.html edit.
function updateImportMapCdnVersions() {
  const CDN_BASE = 'https://3655614-commercedropinscdn-stage.adobeio-static.net';
  const headHtmlPath = path.join(__dirname, 'head.html');
  const headHtml = fs.readFileSync(headHtmlPath, 'utf8');

  const importMapMatch = headHtml.match(/(<script nonce="aem" type="importmap">\s*)([\s\S]*?)(\s*<\/script>)/);
  if (!importMapMatch) {
    console.warn('⚠️  Could not find the import map in head.html -- skipping CDN version sync.');
    return;
  }

  const importMap = JSON.parse(importMapMatch[2]);

  Object.entries(installedVersions).forEach(([pkgName, version]) => {
    if (pkgName === '@dropins/tools') return;

    const dropinName = pkgName.replace('@dropins/', '');
    const mapKey = `${pkgName}/`;
    const oldBase = importMap.imports[mapKey];
    if (!oldBase) return; // not (yet) served from the CDN in this import map

    const newBase = `${CDN_BASE}/${dropinName}/${version}/`;
    importMap.imports[mapKey] = newBase;

    const oldFragmentsKey = `${oldBase}fragments.js`;
    const localFragmentsPath = `/scripts/__dropins__/${dropinName}/fragments.js`;
    if (importMap.imports[oldFragmentsKey]) {
      delete importMap.imports[oldFragmentsKey];
      importMap.imports[`${newBase}fragments.js`] = localFragmentsPath;
    }
  });

  const newImportMapJson = JSON.stringify(importMap, null, 4).replace(/\n/g, '\n    ');
  let newHeadHtml = headHtml.replace(importMapMatch[0], `${importMapMatch[1]}${newImportMapJson}${importMapMatch[3]}`);

  // head.html may also hardcode <link rel="modulepreload"> hints straight to
  // a dropin's local vendored path (e.g. to warm up an eagerly-used file).
  // Since only fragments.js is vendored locally now, any such hint pointing
  // at a CDN-hosted dropin's file other than fragments.js is dead -- rewrite
  // it to the real (versioned) CDN URL instead of leaving it 404ing.
  newHeadHtml = newHeadHtml.replace(
    /<link rel="modulepreload" href="\/scripts\/__dropins__\/(storefront-[^/]+)\/((?!fragments\.js)[^"]+)" \/>/g,
    (match, dropinName, filePath) => {
      const version = installedVersions[`@dropins/${dropinName}`];
      if (!version) return match;
      return `<link rel="modulepreload" href="${CDN_BASE}/${dropinName}/${version}/${filePath}" />`;
    },
  );

  fs.writeFileSync(headHtmlPath, newHeadHtml);
}

updateImportMapCdnVersions();

// pdp.js preloads PDP assets from a hardcoded CDN URL (see head.html's import
// map comment above) -- keep its version in sync too, otherwise the preload
// and the real import target different versions and the preload is wasted.
function updatePdpPreloadCdnVersion() {
  const pdpVersion = installedVersions['@dropins/storefront-pdp'];
  if (!pdpVersion) return;

  const pdpJsPath = path.join(__dirname, 'scripts', 'initializers', 'pdp.js');
  const pdpJs = fs.readFileSync(pdpJsPath, 'utf8');
  const newPdpJs = pdpJs.replace(
    /const cdnBase = '(https:\/\/3655614-commercedropinscdn-stage\.adobeio-static\.net\/storefront-pdp\/)[^/]+\/';/,
    `const cdnBase = '$1${pdpVersion}/';`,
  );
  if (newPdpJs !== pdpJs) {
    fs.writeFileSync(pdpJsPath, newPdpJs);
  }
}

updatePdpPreloadCdnVersion();

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
