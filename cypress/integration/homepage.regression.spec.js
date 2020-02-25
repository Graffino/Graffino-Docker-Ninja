context('Regression', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Homepage', () => {
    it('should have a nice looking button', () => {
      cy.wait(5000)
      cy.get('.hero .button').matchImageSnapshot()
    })
  })
})
