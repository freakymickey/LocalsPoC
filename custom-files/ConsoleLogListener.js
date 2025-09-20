import { useEffect } from 'react';

let ConsoleLogs = [];
let ConsoleLogListenerInitialized = false;

const safeStringify = obj => {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) return '[Circular]';
        seen.add(value);
      }
      return value;
    },
    2
  );
};

const ConsoleLogListener = () => {
  console.log('Init ConsoleLogListener', ConsoleLogs.length);

  useEffect(() => {
    if (!ConsoleLogListenerInitialized) {
      ConsoleLogListenerInitialized = true;

      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;

      const captureLog = (type, ...args) => {
        // const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)).join(' ');
        const message = args
          .map(arg => (typeof arg === 'object' ? safeStringify(arg) : arg))
          .join(' ');
        // setLogs(prevLogs => [...prevLogs.slice(-99), { type, message }]); // Ograniczamy do 100 logów
        ConsoleLogs = [...ConsoleLogs.slice(-199), { type, message }]; // Ograniczamy do 100 logów
        originalLog(...args); // Nadal logujemy do konsoli deweloperskiej
      };

      console.log = (...args) => captureLog('log', ...args);
      console.warn = (...args) => captureLog('warn', ...args);
      console.error = (...args) => captureLog('error', ...args);
    }
    return () => {
      // console.log = originalLog;
      // console.warn = originalWarn;
      // console.error = originalError;

      console.log('Cleanup ConsoleLogListener');
    };
  }, []);
};

export { ConsoleLogListener, ConsoleLogs };
