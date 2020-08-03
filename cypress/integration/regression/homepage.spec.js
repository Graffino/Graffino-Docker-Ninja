context('Regression', () => {
  beforeEach(() => {
    cy.visit('/')
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
