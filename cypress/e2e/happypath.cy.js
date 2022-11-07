describe('Happy path', () => {
  beforeEach(() => {
    cy.visit('https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo')
  })
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('fill all mandotory fields', () => {
    cy.viewport(375, 667)
    cy.get("#firstname").type("John");
    cy.get("#lastname").type("Doe");
    cy.get("#phone").type("1234");
    cy.get("#email").type("john@johndoe.com");
    cy.get("#deposit").type("100000");
    cy.get("#iAgreeDemo").click();
    cy.get(".button").click();
    cy.wait(5000)
  })

  it('fill all fields', () => {
    cy.viewport(390, 844)
    cy.get("#firstname").type("John");
    cy.get("#lastname").type("Doe");
    cy.get("#phone").type("1234");
    cy.get("#countryLabel").type("Japan");
    cy.get("#email").type("john@johndoe.com");
    cy.get("#platform").select("mt4");
    cy.get("#accountType").select("nano");
    cy.get("#leverage").select("1:100");
    cy.get("#currency").select("USD");
    cy.get("#deposit").type("1234");
    cy.get("#iAgreeDemo").click();
    cy.get(".button").click();
  })
  
})