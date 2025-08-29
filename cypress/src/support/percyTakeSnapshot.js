const percyTakeSnapshot = (nameOfSnapshot, screenWidth, isMobile = false) => {
    if (isMobile) {
        // Mobile-specific setup
        cy.get('.nav-wrapper').invoke('removeClass', 'active');
        cy.get('#nav').invoke('attr', 'aria-expanded', 'false');
        // cy.get('[style*="overflow-y: hidden"]').invoke('attr', 'style', '');
        cy.get('body > header.header-wrapper').find('div').first().invoke('attr', 'class', 'overlay');

        cy.percySnapshot(nameOfSnapshot, {
            widths: [screenWidth]
        });
    } else {
        // Desktop setup
        cy.viewport(1280, 1024)
            .percySnapshot(nameOfSnapshot, { widths: [screenWidth] });
    }
};

// Register the unified command
Cypress.Commands.add('percyTakeSnapshot', percyTakeSnapshot);