import {
    assertImageListDisplay
} from "../../assertions";

describe("Verify Product List Page", () => {
    it("Verify PLP page loads", () => {
        cy.visit("");

        // Open Catalog Menu
        cy.get(".nav-drop").first().should('be.visible').trigger("mouseenter");

        // Navaigate to Apperal category page
        cy.contains("Apparel").should('be.visible').click();

        assertImageListDisplay('.product-discovery-product-list__grid');

        cy.percyTakeSnapshot('Category Product List page', 1280);

    });
});

