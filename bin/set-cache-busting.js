module.exports = function getTime() {
  return new Date().toISOString().replace(/[TZ:\-.]/g, '')
}
