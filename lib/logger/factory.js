/*global require, exports*/

// `LoggerFactory`
// ===============
// @param {Logger} Logger
// @return {Logger}
// @api {public}
function LoggerFactory (Logger) {
  this.Logger = Logger;
};
LoggerFactory.prototype = {
  // `get`
  // -----
  // Get a Logger object with the given configuration.
  // @param {Object} config
  // @return {Logger}
  // @api {public}
  'get': function (config) {
    return new this.Logger(config);
  }
};

exports.LoggerFactory = LoggerFactory;