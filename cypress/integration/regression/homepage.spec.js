/// <reference types="cypress" />

context('Regression', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  // https://on.cypress.io/interacting-with-elements
  describe('Homepage', () => {
    it('should look nice', () => {

      // snapshot name will be the test title
      cy.wait(5000)

      // cy.matchImageSnapshot()
      // match element snapshot
    })
    it('should have a nice looking button', () => {
      cy.get('.hero .button').matchImageSnapshot()
    })
  })
})
