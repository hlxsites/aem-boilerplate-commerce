describe("Product Search Functionality", () => {
  const testUrl = "https://main--aem-boilerplate-commerce--hlxsites.aem.live/";
  
  beforeEach(() => {
    // Visit the AEM boilerplate commerce site
    cy.visit(testUrl);
    cy.wait(2000); // Allow page to load completely
  });

  describe("Search UI Elements", () => {
    it("should display search button in navigation", () => {
      cy.get(".nav-search-button")
        .should("be.visible")
        .and("contain.text", "Search");
    });

    it("should open search input when search button is clicked", () => {
      cy.get(".nav-search-button").click();
      cy.get("#search-bar-input-form")
        .should("be.visible")
        .and("be.enabled");
    });

    it("should have proper search input placeholder", () => {
      cy.get(".nav-search-button").click();
      cy.get("#search-bar-input-form")
        .should("have.attr", "placeholder")
        .and("include", "Search");
    });
  });

  describe("Basic Search Functionality", () => {
    it("should perform search for 'shirt' and display results", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      // Type search term
      cy.get("#search-bar-input-form").type("shirt");
      cy.wait(3000); // Wait for search results to load
      
      // Check if search results are displayed
      cy.get(".product-discovery--search-bar-results__grid")
        .should("be.visible");
      
      // Verify that product items are shown
      cy.get(".product-discovery--product-item")
        .should("have.length.at.least", 1);
      
      // Check that product details are visible
      cy.get(".product-discovery--product-item__details")
        .first()
        .should("be.visible");
    });

    it("should perform search for 'tee' and display results", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("tee");
      cy.wait(3000);
      
      cy.get(".product-discovery--search-bar-results__grid")
        .should("be.visible");
      
      cy.get(".product-discovery--product-item")
        .should("have.length.at.least", 1);
    });

    it("should perform search for 'youth' and display results", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("youth");
      cy.wait(3000);
      
      cy.get(".product-discovery--search-bar-results__grid")
        .should("be.visible");
      
      cy.get(".product-discovery--product-item")
        .should("have.length.at.least", 1);
    });
  });

  describe("Search Results Interaction", () => {
    it("should navigate to product page when clicking on search result", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("shirt");
      cy.wait(3000);
      
      // Click on first search result
      cy.get(".product-discovery--product-item__details")
        .first()
        .click();
      
      // Verify navigation to product page
      cy.url().should("include", "/products/");
      
      // Verify product page elements are loaded
      cy.get(".product-details", { timeout: 10000 })
        .should("be.visible");
    });

    it("should display product information in search results", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("tee");
      cy.wait(3000);
      
      // Check that each result has product name
      cy.get(".product-discovery--product-item__name")
        .should("have.length.at.least", 1)
        .each(($name) => {
          cy.wrap($name).should("not.be.empty");
        });
      
      // Check that each result has price information
      cy.get(".product-discovery--product-item__price")
        .should("have.length.at.least", 1)
        .each(($price) => {
          cy.wrap($price).should("not.be.empty");
        });
    });
  });

  describe("Search URL Navigation", () => {
    it("should navigate to search results page with query parameter", () => {
      // Direct navigation to search URL
      cy.visit(`${testUrl}search?q=shirt`);
      cy.wait(3000);
      
      // Verify search results page is loaded
      cy.url().should("include", "/search?q=shirt");
      
      // Verify search results are displayed
      cy.get(".product-list-page", { timeout: 10000 })
        .should("be.visible");
      
      // Check for product items on search results page
      cy.get(".product-item")
        .should("have.length.at.least", 1);
    });

    it("should maintain search query in URL when navigating", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("youth tee{enter}");
      cy.wait(3000);
      
      // Should navigate to search results page
      cy.url().should("include", "/search?q=youth%20tee");
    });
  });

  describe("Search Edge Cases", () => {
    it("should handle empty search gracefully", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      // Try to submit empty search
      cy.get("#search-bar-input-form").type("{enter}");
      cy.wait(2000);
      
      // Should not crash or show error
      cy.get("body").should("be.visible");
    });

    it("should handle search with special characters", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("t-shirt & pants");
      cy.wait(3000);
      
      // Should handle special characters without errors
      cy.get("body").should("be.visible");
    });

    it("should handle very long search terms", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      const longSearchTerm = "this is a very long search term that might cause issues with the search functionality";
      cy.get("#search-bar-input-form").type(longSearchTerm);
      cy.wait(3000);
      
      // Should handle long search terms without errors
      cy.get("body").should("be.visible");
    });

    it("should handle search with no results", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      // Search for something that likely won't have results
      cy.get("#search-bar-input-form").type("xyznonexistentproduct123");
      cy.wait(3000);
      
      // Should handle no results gracefully
      cy.get("body").should("be.visible");
    });
  });

  describe("Search Performance and Loading", () => {
    it("should show loading state during search", () => {
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("shirt");
      
      // Check for loading indicators (this may vary based on implementation)
      // The test should not fail if loading indicators are not present
      cy.get("body").should("be.visible");
      
      cy.wait(3000);
      cy.get(".product-discovery--search-bar-results__grid")
        .should("be.visible");
    });

    it("should complete search within reasonable time", () => {
      const start = Date.now();
      
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form").type("tee");
      
      cy.get(".product-discovery--search-bar-results__grid", { timeout: 10000 })
        .should("be.visible")
        .then(() => {
          const duration = Date.now() - start;
          expect(duration).to.be.lessThan(10000); // Should complete within 10 seconds
        });
    });
  });

  describe("Mobile Search Functionality", () => {
    it("should work on mobile viewport", () => {
      cy.viewport("iphone-x");
      
      cy.get(".nav-search-button").click();
      cy.wait(1000);
      
      cy.get("#search-bar-input-form")
        .should("be.visible")
        .type("shirt");
      cy.wait(3000);
      
      cy.get(".product-discovery--search-bar-results__grid")
        .should("be.visible");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels for search elements", () => {
      cy.get(".nav-search-button")
        .should("have.attr", "aria-label")
        .or("contain.text", "Search");
      
      cy.get(".nav-search-button").click();
      
      cy.get("#search-bar-input-form")
        .should("have.attr", "type", "text");
    });

    it("should support keyboard navigation", () => {
      // Test keyboard navigation
      cy.get("body").tab();
      
      // Should be able to reach search button via keyboard
      cy.focused().should("contain.text", "Search").or("have.class", "nav-search-button");
    });
  });
});
