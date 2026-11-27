describe('Company context on store changes', { tags: ['@B2BSaas', '@B2BAco'] }, () => {
  const keys = [
    'DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT',
    'DROPIN__COMPANYSWITCHER__GROUP__CONTEXT',
  ];

  function visitWithContext(previousPath) {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.document.cookie = `dropin_website_path=${previousPath}; path=/`;
        win.document.cookie = 'auth_dropin_user_token=test-token; path=/';
        keys.forEach((key) => {
          win.sessionStorage.setItem(key, 'old-context');
          win.localStorage.setItem(key, 'old-context');
        });

        const operations = [];
        const { setItem, removeItem } = win.Storage.prototype;
        win.Storage.prototype.setItem = function trackSet(key, value) {
          if (keys.includes(key)) operations.push({ key, action: 'set' });
          return setItem.call(this, key, value);
        };
        win.Storage.prototype.removeItem = function trackRemove(key) {
          if (keys.includes(key)) operations.push({ key, action: 'remove' });
          return removeItem.call(this, key);
        };
        win.companyContextOperations = operations;
      },
    });
  }

  it('clears both company context values before restoring state on a new website', () => {
    visitWithContext('/other/');
    cy.window().its('companyContextOperations').should((operations) => {
      keys.forEach((key) => {
        expect(operations.filter((operation) => operation.key === key).slice(0, 2))
          .to.deep.equal([{ key, action: 'remove' }, { key, action: 'remove' }]);
      });
    });
  });

  it('preserves company context during initialization on the same website', () => {
    visitWithContext('/');
    cy.window().its('companyContextOperations').should((operations) => {
      keys.forEach((key) => {
        expect(operations.find((operation) => operation.key === key))
          .to.deep.equal({ key, action: 'set' });
      });
    });
  });
});
