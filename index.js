/*global require, module*/
var winston = require('winston'),

    config  = {
      levels: {
        panic: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warn: 4,
        notice: 5,
        info: 6,
        log: 6,
        debug: 7
      },

      colors: {
        panic: 'red',
        alert: 'red',
        crit: 'red',
        error: 'red',
        warn: 'orange',
        notice: 'yellow',
        info: 'magenta',
        log: 'cyan',
        debug: 'blue'
      }
    },

    logger  = new (winston.Logger)({
      levels: config.levels,
      colors: config.colors
    }),

    currentLevelName = null,

    init = function (level, colorize, timestamp) {
      level = level || 'info'; // default level is info.

      if(typeof colorize === 'undefined') {
        colorize = true;  // we colorize log output by default.
      }
      if(typeof timestamp === 'undefined') {
        timestamp = false; // we don't set a timestamp by default.
      }
      //If we have a currentLevelName that means that we are re-initializing.
      if(currentLevelName) {
        logger.remove(winston.transports.Console);
      }

      logger.add(winston.transports.Console, {
        level: level,
        colorize: colorize,
        timestamp: timestamp
      });

      setTimeout(logger.info.bind(logger), 0,
        "LOGGER - Setting `log level` to: " + level + "(" + config.levels[level] + ")"
      );

      currentLevelName = level;
    }
;

init();  //initialize on load.

logger.setLevel = function (level) {
  if(level !== currentLevelName) {
    init(level);
  }
};

logger.cli();

// Make level(int) to string object.
level_to_name = (function (res) {
  var curLevel, curLevelName;

  for(curLevelName in config.levels) {
    curLevel = config.levels[curLevelName];

    if(!res[curLevel]) {
      res[curLevel] = curLevelName;
      res.length += 1;
    }
  }
}({ length: 0}));

// Allow the user to toggle through the log levels by sending a SIGUSR2 signal
// to the process.
process.on('SIGUSR2', function () {
  var current_level = config.levels[currentLevelName],
      next_level    = current_level + 1,
      next_level_name
  ;
  if (next_level >= level_to_name.length) {
    next_level = 0;
  }
  next_level_name = level_to_name[next_level];

  logger.setLevel(next_level_name);
});

module.exports = logger;