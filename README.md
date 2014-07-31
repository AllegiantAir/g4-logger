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
