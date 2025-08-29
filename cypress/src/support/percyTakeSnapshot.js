const percyTakeSnapshot = (nameOfSnapshot, screenWidth, isMobile = false) => {
    if (isMobile) {
        // Mobile-specific setup
        cy.get('.nav-wrapper').invoke('removeClass', 'active');
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
    } else {
        // Desktop setup
        cy.viewport(1280, 1024)
          .percySnapshot(nameOfSnapshot, { widths: [screenWidth] });
    }
};

// Register the unified command
Cypress.Commands.add('percyTakeSnapshot', percyTakeSnapshot);