export type LogArgs = unknown[];

function safeConsole(...args: unknown[]) {
  if (typeof console !== 'undefined' && console.log) console.log(...args);
}

export const logger = {
  debug: (...args: LogArgs) => {
    try {
      if (typeof console !== 'undefined' && typeof console.debug === 'function') {
        console.debug(...args);
      } else {
        safeConsole(...args);
      }
    } catch (_e) {
      safeConsole(...args);
    }
  },
  info: (...args: LogArgs) => {
    try {
      if (typeof console !== 'undefined' && typeof console.info === 'function') {
        console.info(...args);
      } else {
        safeConsole(...args);
      }
    } catch (_e) {
      safeConsole(...args);
    }
  },
  warn: (...args: LogArgs) => {
    try {
      if (typeof console !== 'undefined' && typeof console.warn === 'function') {
        console.warn(...args);
      } else {
        safeConsole(...args);
      }
    } catch (_e) {
      safeConsole(...args);
    }
  },
  error: (...args: LogArgs) => {
    try {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(...args);
      } else {
        safeConsole(...args);
      }
    } catch (_e) {
      safeConsole(...args);
    }
  },
};

export default logger;
