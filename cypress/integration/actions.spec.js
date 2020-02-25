context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Redirects down below', () => {
    cy.get('.hero .button').click()
    cy.hash().should('eq', '#setup')
  })
})
