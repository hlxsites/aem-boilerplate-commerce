const cypress = require('eslint-plugin-cypress/flat');

module.exports = [
  cypress.configs.recommended,
  {
    files: ['**/*.js'],
    rules: {
      'cypress/unsafe-to-chain-command': 'warn',
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/no-assigning-return-values': 'warn',
    },
  },
];

