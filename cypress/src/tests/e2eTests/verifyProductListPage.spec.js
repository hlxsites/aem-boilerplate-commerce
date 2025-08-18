describe("Verify Product List Page", () => {
    it("Verify PLP page loads", () => {
        cy.visit("");

        // Open Catalog Menu
        cy.get(".nav-drop").first().should('be.visible').trigger("mouseenter");

        // Navaigate to Apperal category page
        cy.contains("Apparel").should('be.visible').click();

        cy.get('img').each(($img) => {
            cy.wrap($img)
                .should('be.visible')
                .and(($el) => {
                    // Check that the image has a naturalWidth greater than 0
                    expect($el[0].naturalWidth).to.be.greaterThan(0);
                });
        });

        cy.percyTakeSnapshot('Category Product List page', 1280);

    });
});

