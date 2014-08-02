/*global module*/
// `Logger Configuration`
// ======================

module.exports = {
  levels: {
    panic: 7,
    alert: 6,
    crit: 5,
    error: 4,
    warn: 3,
    notice: 2,
    info: 1,
    debug: 0
  },

  colors: {
    panic: 'black bold redBG',
    alert: 'black bold yellowBG',
    crit: 'red bold blackBG',
    error: 'red',
    warn: 'yellow',
    notice: 'magenta',
    info: 'blue',
    log: 'grey',
    debug: 'cyan'
  },
  padLevels: true
};