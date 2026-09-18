#!/usr/bin/env node

/**
 * Checks that package-lock.json matches what `npm install` actually resolves
 * before allowing a commit that touches package.json or package-lock.json.
 *
 * `npm install` can rewrite package-lock.json (e.g. dependency resolution details)
 * even when a change looks like a small, targeted dependency bump. If that rewrite
 * isn't committed too, other developers and CI end up installing a different
 * dependency tree than the one that was actually tested.
 *
 * This script is designed to be run as a pre-commit hook via husky.
 */

const { execSync } = require('child_process');

const colors = {
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  // eslint-disable-next-line no-console
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getStagedFiles() {
  try {
    return execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch (error) {
    log('Error getting staged files:', 'red');
    // eslint-disable-next-line no-console
    console.error(error.message);
    return [];
  }
}

function lockfileDiffersFromStaged() {
  const diff = execSync('git diff --name-only -- package-lock.json', { encoding: 'utf8' }).trim();
  return diff.length > 0;
}

function main() {
  const stagedFiles = getStagedFiles();

  if (!stagedFiles.includes('package.json') && !stagedFiles.includes('package-lock.json')) {
    return 0;
  }

  log('\n🔍 package.json/package-lock.json changed — verifying the lockfile matches `npm install`...', 'blue');

  try {
    execSync('npm install --ignore-scripts --no-audit --no-fund', { stdio: 'pipe' });
  } catch (error) {
    log('\n⚠️  Could not run npm install to verify package-lock.json (skipping this check):', 'yellow');
    // eslint-disable-next-line no-console
    console.error(error.message);
    return 0;
  }

  if (!lockfileDiffersFromStaged()) {
    log('✅ package-lock.json matches what npm install produces.', 'green');
    return 0;
  }

  log(`\n❌ ${colors.bold}COMMIT BLOCKED: npm install changed package-lock.json${colors.reset}`, 'red');
  log('\nRunning `npm install` just modified package-lock.json in your working directory.', 'yellow');
  log('That means the lockfile you staged does not match what npm actually resolves', 'yellow');
  log('for the current package.json — committing it as-is would leave other developers', 'yellow');
  log('and CI installing a different dependency tree than the one you tested against.', 'yellow');

  log('\n🔧 To fix this:', 'blue');
  log('  1. Review what npm install just changed: git diff package-lock.json', 'blue');
  log('  2. Stage the result: git add package-lock.json', 'blue');
  log('  3. Commit again', 'blue');

  log('\n⚡ If you really need to skip this check, you can force with:', 'red');
  log('  git commit --no-verify', 'red');

  return 1;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { main };
