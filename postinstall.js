const fs = require('fs');
const path = require('path');

const { dependencies } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const CDN_BASE = 'https://3655614-commercedropinscdn-stage.adobeio-static.net';

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

// Not every installed version is guaranteed to have been published to the
// CDN (e.g. an alpha cut for local testing only) -- check before assuming it,
// so that case falls back to vendoring the dropin fully instead of 404ing.
async function checkCdnHasVersion(dropinName, version) {
  try {
    const res = await fetch(`${CDN_BASE}/${dropinName}/${version}/LICENSE.md`, { method: 'HEAD' });
    // App Builder's CloudFront-backed hosting returns 200 with a generic
    // text/html error page for unmatched paths, not a real 404 -- a real
    // LICENSE.md is served as text/markdown, so check that too.
    return res.ok && (res.headers.get('content-type') ?? '').includes('text/markdown');
  } catch {
    return false;
  }
}

async function main() {
  const headHtmlPath = path.join(__dirname, 'head.html');
  const headHtml = fs.readFileSync(headHtmlPath, 'utf8');

  const importMapMatch = headHtml.match(/(<script nonce="aem" type="importmap">\s*)([\s\S]*?)(\s*<\/script>)/);
  if (!importMapMatch) {
    console.warn('⚠️  Could not find the import map in head.html -- skipping CDN sync.');
    return;
  }
  const importMap = JSON.parse(importMapMatch[2]);

  // Every installed dropin is a CDN candidate. Deriving this from head.html's
  // *current* URL would be self-defeating: once a version falls back to
  // local (because the CDN didn't have it yet), the next run would read that
  // local path back and never try the CDN again.
  const cdnHosted = Object.keys(installedVersions).filter((pkgName) => importMap.imports[`${pkgName}/`]);

  const useCdn = {};
  await Promise.all(cdnHosted.map(async (pkgName) => {
    const dropinName = pkgName.replace('@dropins/', '');
    useCdn[pkgName] = await checkCdnHasVersion(dropinName, installedVersions[pkgName]);
    if (!useCdn[pkgName]) {
      console.warn(`⚠️  ${pkgName}@${installedVersions[pkgName]} not found on the CDN -- vendoring it locally instead.`);
    }
  }));

  // Vendor each dropin: only fragments.js if the CDN has this version,
  // otherwise the full package (the pre-CDN behavior) as a fallback.
  fs.readdirSync('node_modules/@dropins', { withFileTypes: true }).forEach((file) => {
    const pkgName = `@dropins/${file.name}`;
    if (!dependencies[pkgName] || !file.isDirectory()) return;

    const srcDir = path.join('node_modules', '@dropins', file.name);
    const destDir = path.join(dropinsDir, file.name);

    if (cdnHosted.includes(pkgName) && useCdn[pkgName]) {
      const fragmentsSrc = path.join(srcDir, 'fragments.js');
      if (!fs.existsSync(fragmentsSrc)) return;
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(fragmentsSrc, path.join(destDir, 'fragments.js'));
      const fragmentsMapSrc = `${fragmentsSrc}.map`;
      if (fs.existsSync(fragmentsMapSrc)) {
        fs.copyFileSync(fragmentsMapSrc, path.join(destDir, 'fragments.js.map'));
      }
      return;
    }

    // Not CDN-hosted, or the CDN doesn't have this version -- vendor in full.
    fs.cpSync(srcDir, destDir, {
      recursive: true,
      filter: (src) => (!src.endsWith('package.json')),
    });
  });

  // Keep head.html's import map (and version) in sync with what was just
  // installed -- CDN-hosted if the CDN has this version, local otherwise.
  cdnHosted.forEach((pkgName) => {
    const dropinName = pkgName.replace('@dropins/', '');
    const mapKey = `${pkgName}/`;
    const oldBase = importMap.imports[mapKey];
    const oldFragmentsKey = `${oldBase}fragments.js`;
    const localBase = `/scripts/__dropins__/${dropinName}/`;

    if (useCdn[pkgName]) {
      const newBase = `${CDN_BASE}/${dropinName}/${installedVersions[pkgName]}/`;
      importMap.imports[mapKey] = newBase;
      if (importMap.imports[oldFragmentsKey] || oldBase !== newBase) {
        delete importMap.imports[oldFragmentsKey];
        importMap.imports[`${newBase}fragments.js`] = `${localBase}fragments.js`;
      }
    } else {
      importMap.imports[mapKey] = localBase;
      delete importMap.imports[oldFragmentsKey];
    }
  });

  const newImportMapJson = JSON.stringify(importMap, null, 4).replace(/\n/g, '\n    ');
  let newHeadHtml = headHtml.replace(importMapMatch[0], `${importMapMatch[1]}${newImportMapJson}${importMapMatch[3]}`);

  // head.html may also hardcode <link rel="modulepreload"> hints or a plain
  // import() straight to a dropin's path (e.g. the import-map polyfill shim,
  // which has to stay a literal URL since it runs before any import map can
  // apply). Keep those in sync with the same CDN-vs-local decision above.
  // Matched separately (CDN vs. local) rather than with one combined regex --
  // a single pattern can't unambiguously tell a CDN version segment apart
  // from a real nested local path segment (e.g. tools/lib/aem/configs.js).
  const rewriteHardcodedRef = (html, cdnPattern, localPattern, buildReplacement) => html
    .replace(cdnPattern, (match, dropinName, filePath) => {
      const pkgName = `@dropins/${dropinName}`;
      const version = installedVersions[pkgName];
      if (!version) return match;
      const base = useCdn[pkgName] ? `${CDN_BASE}/${dropinName}/${version}/` : `/scripts/__dropins__/${dropinName}/`;
      return buildReplacement(base, filePath);
    })
    .replace(localPattern, (match, dropinName, filePath) => {
      const pkgName = `@dropins/${dropinName}`;
      const version = installedVersions[pkgName];
      if (!version) return match;
      const base = useCdn[pkgName] ? `${CDN_BASE}/${dropinName}/${version}/` : `/scripts/__dropins__/${dropinName}/`;
      return buildReplacement(base, filePath);
    });

  newHeadHtml = rewriteHardcodedRef(
    newHeadHtml,
    /<link rel="modulepreload" href="https:\/\/[^/]+\/(storefront-[^/]+|tools)\/[^/]+\/((?!fragments\.js)[^"]+)" \/>/g,
    /<link rel="modulepreload" href="\/scripts\/__dropins__\/(storefront-[^/]+|tools)\/((?!fragments\.js)[^"]+)" \/>/g,
    (base, filePath) => `<link rel="modulepreload" href="${base}${filePath}" />`,
  );

  newHeadHtml = rewriteHardcodedRef(
    newHeadHtml,
    /import\('https:\/\/[^/]+\/(storefront-[^/]+|tools)\/[^/]+\/((?!fragments\.js)[^']+)'\)/g,
    /import\('\/scripts\/__dropins__\/(storefront-[^/]+|tools)\/((?!fragments\.js)[^']+)'\)/g,
    (base, filePath) => `import('${base}${filePath}')`,
  );

  fs.writeFileSync(headHtmlPath, newHeadHtml);

  // pdp.js preloads PDP assets from a hardcoded base URL -- keep it in sync
  // too, otherwise the preload and the real import target different places
  // (or different versions) and the preload is wasted.
  const pdpPkgName = '@dropins/storefront-pdp';
  if (installedVersions[pdpPkgName]) {
    const pdpBase = useCdn[pdpPkgName]
      ? `${CDN_BASE}/storefront-pdp/${installedVersions[pdpPkgName]}/`
      : '/scripts/__dropins__/storefront-pdp/';
    const pdpJsPath = path.join(__dirname, 'scripts', 'initializers', 'pdp.js');
    const pdpJs = fs.readFileSync(pdpJsPath, 'utf8');
    const newPdpJs = pdpJs.replace(
      /const cdnBase = '(?:https:\/\/[^/]+\/storefront-pdp\/[^/]+\/|\/scripts\/__dropins__\/storefront-pdp\/)';/,
      `const cdnBase = '${pdpBase}';`,
    );
    if (newPdpJs !== pdpJs) {
      fs.writeFileSync(pdpJsPath, newPdpJs);
    }
  }
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

main()
  .then(() => checkPackageLockForArtifactory())
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
