export const logger = {
  info: (message: string, data?: any) => {
    process.stdout.write(`[INFO] ${message} ${data ? JSON.stringify(data) : ""}\n`);
  },
  error: (message: string, data?: any) => {
    process.stderr.write(`[ERROR] ${message} ${data ? JSON.stringify(data) : ""}\n`);
  }
};
