module.exports = {
  // Lowered from 60000: assertions resolve as soon as their condition is met,
  // so this only caps how long a genuinely-failing command hangs before (and
  // during) retries. 30s is generous for the live backends while cutting wasted
  // time on failures. Use a per-command { timeout } override for known-slow spots.
  defaultCommandTimeout: 30000,
  screenshotsFolder: 'screenshots',
  downloadsFolder: 'downloads',
  fixturesFolder: 'src/fixtures',
  video: false,
  // Page loads against the live preview can legitimately be slow; keep generous.
  pageLoadTimeout: 60000,
  requestTimeout: 30000,
  viewportHeight: 900,
  viewportWidth: 1440,
  scrollBehavior: 'nearest',
  trashAssetsBeforeRuns: false,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    baseUrl: 'http://localhost:3000/',
    supportFile: 'src/support/index.js',
    specPattern: 'src/tests/**/*.spec.js',
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
};
