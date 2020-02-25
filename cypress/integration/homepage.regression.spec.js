context('Regression', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Homepage', () => {
    it('should have a nice looking button', () => {
      cy.get('.hero .button').matchImageSnapshot()
    })
  })
})
