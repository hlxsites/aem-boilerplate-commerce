const percyTakeSnapshot = ( nameOfSnapshot, screenWidth) => {
    cy
        .viewport(1280, 1024)
        .percySnapshot(nameOfSnapshot, { width: screenWidth });
};

Cypress.Commands.add('percyTakeSnapshot', percyTakeSnapshot);