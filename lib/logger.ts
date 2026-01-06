// ==============================================
// LOGGER SIMPLE
// ==============================================

const isDev = process.env.NODE_ENV === "development";

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (isDev) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },

  warn: (message: string, ...args: any[]) => {
    if (isDev) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
};
