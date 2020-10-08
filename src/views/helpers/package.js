const pjson = require('../../../package.json')

module.exports = function (key) {
  return pjson[key]
}
