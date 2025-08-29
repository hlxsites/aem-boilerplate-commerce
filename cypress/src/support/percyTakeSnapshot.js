const percyTakeSnapshot = (nameOfSnapshot, screenWidth) => {
    cy
        .viewport(1280, 1024)
        .percySnapshot(nameOfSnapshot, { width: screenWidth });
};

const percyTakeMobileSnapshot = (nameOfSnapshot, screenWidth) => {
    // Remove "active" class using invoke to call jQuery method
    cy.get('.nav-wrapper.active').invoke('removeClass', 'active');
    // Set aria-expanded="false" on nav element
    cy.get('#nav').invoke('attr', 'aria-expanded', 'false');
    
    cy.percySnapshot(nameOfSnapshot, { 
        widths: [screenWidth],
        percyCSS: `
            /* Override styles for Percy snapshots */
            @media (max-width: 768px) {
                .desktop-only {
                    display: none !important;
                }
                .mobile-override {
                    font-size: 14px !important;
                    padding: 8px !important;
                    overflow-y: hidden !important;
                }
                /* Style nav element when collapsed */
                #nav[aria-expanded="false"] {
                    display: none !important;
                }
                /* Style nav-wrapper (now without active class) */
                .nav-wrapper {
                    display: none !important;
                }
            }
        `
    });
};

Cypress.Commands.add('percyTakeSnapshot', percyTakeSnapshot);

Cypress.Commands.add('percyTakeMobileSnapshot', percyTakeMobileSnapshot);