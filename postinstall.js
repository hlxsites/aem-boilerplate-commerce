/* eslint-disable import/extensions, import/no-extraneous-dependencies, no-console */
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { dependencies, libraries } = require('./package.json');

/**
 * Copies a library package to the specified destination directory
 * @param {Object} library - The library configuration object
 * @param {string} library.name - The package name (e.g., '@dropins/storefront-cart')
 * @param {string[]} library.include - Array of glob patterns for files to include
 * @param {string} library.destination - The destination path where the library will be copied
 */
async function copyLibrary(library) {
  const { name: libraryName, include = ['**/*'], destination } = library;

  // Skip if package is not in package.json dependencies
  if (!dependencies[libraryName]) {
    console.warn(`⚠️  Library ${libraryName} not found in dependencies, skipping...`);
    return;
  }

  // Skip if destination is not specified
  if (!destination) {
    console.warn(`⚠️  No destination specified for ${libraryName}, skipping...`);
    return;
  }

  const packagePath = path.join('node_modules', libraryName);

  // Check if the package exists in node_modules
  if (!fs.existsSync(packagePath)) {
    console.warn(`⚠️  Package ${libraryName} not found in node_modules, skipping...`);
    return;
  }

  // Clean up existing destination directory if it exists
  if (fs.existsSync(destination)) {
    console.log(`🧹 Cleaning up existing destination: ${destination}`);
    fs.rmSync(destination, { recursive: true });
  }

  // Ensure destination directory exists
  fs.mkdirSync(destination, { recursive: true });

  // Process all include patterns in parallel
  const patternPromises = include.map(async (pattern) => {
    try {
      // Use glob to find matching files
      const files = await glob(pattern, {
        cwd: packagePath,
        nodir: false,
        dot: true,
      });

      // Process files in parallel
      const copyPromises = files
        .filter((file) => !file.endsWith('package.json'))
        .map((file) => {
          const srcPath = path.join(packagePath, file);
          const destPath = path.join(destination, file);

          // Ensure destination directory exists
          fs.mkdirSync(path.dirname(destPath), { recursive: true });

          // Copy file or directory
          if (fs.statSync(srcPath).isDirectory()) {
            fs.cpSync(srcPath, destPath, { recursive: true });
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
          return Promise.resolve();
        });

      await Promise.all(copyPromises);
    } catch (error) {
      console.warn(`⚠️  Error processing pattern "${pattern}" for ${libraryName}:`, error.message);
    }
  });

  await Promise.all(patternPromises);
  console.log(`✅ Copied ${libraryName} to ${destination}`);
}

// Process all libraries from configuration
async function processLibraries() {
  if (libraries && Array.isArray(libraries)) {
    console.log('📦 Processing configured libraries...\n');
    const copyPromises = libraries.map((library) => copyLibrary(library));
    await Promise.all(copyPromises);
  } else {
    console.warn('⚠️  No libraries configuration found in package.json');
  }
}

processLibraries().then(() => {
  checkSourceMaps();

  checkPackageLockForArtifactory()
    .then((found) => {
      if (!found) {
        console.info('🎉 Packages installed successfully!', '\n');
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
}).catch((error) => {
  console.error('Error processing libraries:', error);
  process.exit(1);
});

function checkPackageLockForArtifactory() {
  return new Promise((resolve, reject) => {
    fs.readFile('package-lock.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const packageLock = JSON.parse(data);
        let found = false;
        Object.keys(packageLock.packages).forEach((packageName) => {
          const packageInfo = packageLock.packages[packageName];
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
