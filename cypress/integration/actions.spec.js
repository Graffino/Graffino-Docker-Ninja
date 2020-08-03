context('Actions', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Redirects down below', () => {
    cy.get('.hero .button').click()
    cy.hash().should('eq', '#setup')
  })
})
