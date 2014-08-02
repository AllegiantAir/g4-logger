g4-logger
=========

A simple logger that is configured with some niceties such as listening for a SIGUSR2 to change log levels

Log Levels
----------
We use syslog levels [RFC-5424](http://tools.ietf.org/html/rfc5424) for the level definitions.

* `0` = `Emergency` (panic) - Only log `panic` conditions
* `1` = `Alert` (alert) - Only notify on conditions that cause immediate failure from the local system.
* `2` = `Critical` (crit) - Notify on conditions that cause immediate failure from the local system or
                            any secondary system or sub system.
* `3` = `Error` (error) - Failures that can be recovered from.
* `4` = `Warning` (warn) - Indicator that an error will occur if action is not taken.
* `5` = `Notice` (notice) - Normal but significant condition. May indicate a potential problem.
* `6` = `Informational` (info) - Normal operational messages.
* `7` = `Debug` (debug) - Information useful to developers for debugging the application.

Usage
-----
Simply load the module and then call the appropriate message functions.
```javascript
  var logger = require('g4-logger');
  
  logger.panic('Everyone panic!');
  logger.log('panic', 'Everyone panic!');
  // should output [panic] - Everyone panic!
  
  logger.crit('A critical error');
  logger.log('crit', 'A critical error.');
  // should output [crit] - A critical error.
   
  logger.error('My terrible error');
  // should output [error] - My terrible error
  
  logger.warn('Beware of codes!');
  // should output [warn] - Beware of codes!
  
  logger.notice('A fancy notice');
  logger.log('notice', 'A fancy notice');
  // should output [notice] - A fancy notice
  
  logger.info('My super message');
  // Should output [info] - My super message
  
  logger.debug('My cool debug message');
  // Should output [debug] - My cool debug message
  
```