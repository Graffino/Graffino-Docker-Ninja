const assert = require('chai').assert

describe('homepage', function () {
  it('should have a proper hero h1', function () {
    return this.browser
      .url('http://localhost:3000/')
      .getText('.hero h1')
      .then((text) => assert.equal(text, 'NINJA'))
  })
})
