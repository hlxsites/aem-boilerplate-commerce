const percyTakeSnapshot = (nameOfSnapshot, screenWidth, isMobile = false) => {
    if (isMobile) {
        cy.percySnapshot(nameOfSnapshot, {
            widths: [screenWidth],
            percyCSS: `
                    /* Override styles for Percy snapshots */
                    @media (max-width: 768px) {
                        [style*="overflow-y: hidden"] {
                            overflow-y: unset !important;
                        }   
                        #nav[aria-expanded="true"] {
                            display: none !important;
                        }
                        .nav-wrapper.active {
                            display: none !important;
                        }
                        .overlay.show {
                            display: none !important;
                        }
                    }
                `
        });
    } else {
        // Desktop setup
        cy.percySnapshot(nameOfSnapshot, { widths: [screenWidth] });
    }
};

// Register the unified command
Cypress.Commands.add('percyTakeSnapshot', percyTakeSnapshot);