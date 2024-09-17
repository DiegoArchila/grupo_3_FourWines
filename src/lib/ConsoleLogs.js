/** @type {*}   -Type of log */
const LogsTypes = {
  INFO: "INFO",
  ERR: "ERR",
  SUCCESS: "SUCCESS",
  WARM: "WARM",
};

const Colors = {
  Blue: "\x1b[34m%s\x1b[0m",
  Red: "\x1b[31m%s\x1b[0m",
  Yellow: "\x1b[33m%s\x1b[0m",
  Green: "\x1b[32m%s\x1b[0m",
};

/**
 * Console output by type
 *
 * @param {string} logType   -Type of log
 * @param {string} message   -Message of the log
 */
const consoleLogs = (logType, message) => {
  switch (logType) {
    case LogsTypes.INFO:
      console.info(Colors.Blue, `[INFO]: ${message}`);
      break;

    case LogsTypes.ERR:
      console.error(Colors.Red, `[ERROR]: ${message}`);
      break;

    case LogsTypes.SUCCESS:
      console.log(Colors.Green, `[SUCCESS]: ${message}`);
      break;

    case LogsTypes.WARM:
      console.warn(Colors.Yellow, `[WARM]: ${message}`);
      break;
    default:
      console.log(message);
      break;
  }
};

module.exports = {
  LogsTypes,
  consoleLogs,
};
