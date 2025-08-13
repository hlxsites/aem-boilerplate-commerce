describe("Verify user account functionality", () => {
  it("Verify auth user can create addresses", () => {
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });
    cy.percyTakeSnapshot('My Account', 1280);
  });
});
