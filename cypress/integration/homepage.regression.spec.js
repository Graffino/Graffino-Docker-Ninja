context('Regression', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.wait(5000)
    cy.viewport(1280, 720)
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
