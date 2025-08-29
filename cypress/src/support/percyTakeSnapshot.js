const percyTakeSnapshot = (nameOfSnapshot, screenWidth, isMobile = false) => {
    // if (isMobile) {
    //     // Mobile-specific setup
    //     cy.wait(2000);
    //     cy.get('body').then($body => {
    //         if ($body.find('[aria-label="Close navigation"]').length > 0) {
    //             cy.get('[aria-label="Close navigation"]').click();
    //         }
    //     });
    //     cy.get('[aria-label="Open navigation"]').should('be.visible');
    //     // // Remove 'active' class only if nav-wrapper with active class exists
    //     // cy.get('body').then($body => {
    //     //     if ($body.find('.nav-wrapper.active').length > 0) {
    //     //         cy.get('.nav-wrapper.active').invoke('removeClass', 'active');
    //     //     }
    //     // });

    //     // // Set aria-expanded only if #nav exists
    //     // cy.get('body').then($body => {
    //     //     if ($body.find('#nav').length > 0) {
    //     //         cy.get('#nav').invoke('attr', 'aria-expanded', 'false');
    //     //     }
    //     // });

    //     // // Remove overflow-y style only if elements with that style exist
    //     // cy.get('body').then($body => {
    //     //     if ($body.find('[style*="overflow-y: hidden"]').length > 0) {
    //     //         cy.get('[style*="overflow-y: hidden"]').invoke('attr', 'style', '');
    //     //     }
    //     // });

    //     // // Set overlay class only if header-wrapper and its first div exist
    //     // cy.get('body').then($body => {
    //     //     if ($body.find('body > header.header-wrapper div').length > 0) {
    //     //         cy.get('body > header.header-wrapper').find('div').first().invoke('attr', 'class', 'overlay');
    //     //     }
    //     // });

    if (isMobile) {
        cy.percySnapshot(nameOfSnapshot, {
                widths: [screenWidth],
                percyCSS: `
                    /* Override styles for Percy snapshots */
                    @media {
                        .mobile-override (max-width: 768px) {
                            overflow-y: hidden !important;
                        }
                        #nav[aria-expanded="false"] {
                            display: none !important;
                        }
                        .nav-wrapper {
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