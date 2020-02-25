/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  // https://on.cypress.io/interacting-with-elements

  it('Redirects down below', () => {
    cy.get('.hero .button').click()
    cy.hash().should('eq', '#setup')
  })
})
