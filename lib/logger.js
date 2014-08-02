
var merge             = require('merge'),
    winston           = require('winston'),
    default_config    = require('./config'),

    // `DEFAULT_LEVEL`
    // ---------------
    // The default log level.
    // @var {string}
    // @const
    DEFAULT_LEVEL     = 'info'
;

function init () {

  if (this.initialized) {
    this.removeAllTransports();
  } else {
    //this.logger.cli();
  }

  if (!this.transports.length || this.transports.length < 1) {
    this.addTransport(winston.transports.Console);
  }

  this.addAllTransports();

  this.initialized = true;

  return this;
}


// `Logger`
// ========
// @param {TransportFactory} transport_factory
// @param {Object} options
// @return {Logger}
function Logger(logger_factory, options) {
  var level_name;

  options.level = options.level || DEFAULT_LEVEL;

  // `config`
  // --------
  // The configuration for this logger.
  // @var {Object}
  this.config = merge(true, default_config, options);

  // `logger`
  // --------
  // The underlying logging object.
  // @var {Winston}
  this.logger = logger_factory.get(this.config);

  // Create a proper level function for each of
  // the defined levels.
  for (level_name in this.config.levels) {
    if (level_name !== 'log') {
      Logger.prototype[level_name] = this.log.bind(this, level_name);
    }
  }

  this.level        = this.config.level;

  this.transports   = [];

  this.initialized  = false;
}

Logger.prototype  = {
  // `log`
  // -----
  // @param {string} level - level at which to log the message.
  // @param {string} message - message to log.
  // @param {Object} meta - **Optional** additional metadata to attach
  // @param {function} callback - continuation to respond to when complete.
  'log': function log (level, message) {
    if (!this.initialized) {
      this.setLevel(this.level);
    }
    var args  = Array.prototype.slice.call(arguments, 1);
    args.unshift(level || this.level);
    this.logger.log.apply(this.logger, args);
  },
  // `getLevel`
  // ----------
  // Get the current level for this logger
  // @return {string}
  // @api {public}
  'getLevel': function getLevel () {
    return this.level;
  },
  // `getNextLevel`
  // --------------
  // Get the next level for this logger.
  // @return {string}
  // @api {public}
  'getNextLevel': function getNextLevel() {
    var levels          = this.config.levels,
        level_num       = levels[this.level],
        next_level_num  = level_num - 1,
        level_name
    ;
    if (next_level_num < 0) {
      next_level_num = Object.keys(levels).length - 1;
    }

    for (level_name in levels) {
      if (next_level_num === levels[level_name]) {
        return level_name;
      }
    }
    // We should never get here, if we do something has gone
    // horribly wrong.
    throw new Error("Unable to retrieve next level.");
  },
  // `setLevel`
  // ----------
  // Set the current log level for this logger
  // @param {string} level
  // @return {Logger}
  // @api {public}
  'setLevel': function setLevel (level) {
    level = level || DEFAULT_LEVEL;

    if(!this.config.levels.hasOwnProperty(level)) {
      throw new Error('Invalid level: ' + level);
    }
    if(this.initialized && level === this.level) {
      return this;
    }

    this.level = level;

    init.call(this);

    return this;
  },
  // `addTransport`
  // --------------
  // Add a new transport to the configured logger.
  // @param {winston.Transport} transport
  // @return {Logger}
  // @api {public}
  'addTransport': function addTransport (transport, options) {
    options = merge(true, this.config, options);
    delete options.levels;
    delete options.colors;

    this.transports.push({ transport: transport, config: options });
    return this;
  },

  // `removeAllTransports`
  // ---------------------
  // A function to remove all of the configured transports.
  // @return {Logger}
  // @api {public}
  'removeAllTransports': function removeAllTransports () {
    var index;

    for (index = 0; index < this.transports.length; index += 1) {
      this.logger.remove(this.transports[index].transport);
    }
    return this;
  },
  // `addAllTransports`
  // ------------------
  // A function to add all of the configured transports.
  // @return {Logger}
  // @api {public}
  'addAllTransports': function addAllTransports () {
    var index, transport, options;

    for (index = 0; index < this.transports.length; index += 1) {
      transport = this.transports[index];
      options   = transport.config;

      if (typeof options.colorize === 'undefined') {
        options.colorize = true; // we colorize the log output by default.
      }
      if (typeof options.timestamp === 'undefined') {
        options.timestamp = false // we don't set a timestamp by default.
      }

      this.logger.add(transport.transport, options);
    }
    return this;
  }
};

exports.Logger = Logger;