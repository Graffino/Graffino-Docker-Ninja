context('Regression', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Homepage', () => {
    it('should look nice', () => {
      cy.wait(5000)
    })
    it('should have a nice looking button', () => {
      cy.get('.hero .button').matchImageSnapshot()
    })
  })
})
