context('Regression', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(5000)
  })

  describe('Homepage', () => {
    it('should have a nice looking button', () => {
      cy.get('.hero .button').matchImageSnapshot()
    })

    it('should have a nice looking homepage', () => {
      cy.get('body').matchImageSnapshot()
    })
  })
})
