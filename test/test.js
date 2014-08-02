var Logger  = require(__dirname + '/../index'),
    logger  = Logger({ level: 'debug' });
;

logger.log('info', 'test log');
logger.panic('kernel panic, crap!');
logger.alert('test alert');
logger.crit('test critical');
logger.error('test error');
logger.warn('test warning');
logger.notice('test notice');
logger.info('some information');
logger.debug('test debug');

run = true;

while (run) {
  process.on('SIGUSR2', function () {
    console.log("LEVEL: " + logger.getLevel());
    if (logger.getLevel() === 'debug') {
      logger.panic("System Shutdown now.");
      run = false;
      return;
    }
    process.emit('SIGUSR2');
  });

  process.emit('SIGUSR2');
}
