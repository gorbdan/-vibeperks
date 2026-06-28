type LogContext = Record<string, unknown>;

export const logger = {
  error(message: string, error?: unknown, context?: LogContext) {
    console.error(JSON.stringify({ level: "error", message, error, context }));
  }
};
