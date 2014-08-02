/*global require, module, process*/
var winston       = require('winston'),
    Logger        = require(__dirname + '/lib/logger').Logger,
    LoggerFactory = require(__dirname + '/lib/logger/factory').LoggerFactory
;

module.exports   = function (options) {
  options = options || {};

  var factory = new LoggerFactory(options.transport || winston.Logger),
    logger  = new Logger(factory, options)
  ;

  process.on('SIGUSR2', function () {
    var next_level  = logger.getNextLevel();
    logger.setLevel(next_level);

    console.log("Setting Log Level To: " + next_level);
  });

  return logger;
};