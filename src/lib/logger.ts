import winston from 'winston';

const { combine, timestamp, printf, errors, json } = winston.format;

// Define custom log format (you can customize this as needed)
const logFormat = printf(({ level, message, timestamp, stack }) => {
  if (stack) {
    // This is an error log with a stack trace
    return `${timestamp} [${level}] ${message}\n${stack}`;
  }
  return `${timestamp} [${level}] ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: process.env.CT_ENV === "development" ? 'debug' : 'info',  // You can set it to 'debug' for development, 'info' or 'warn' for production
  format: combine(
    timestamp(),
    errors({ stack: true }), // Enables stack trace logging for error logs
    logFormat
  ),
  transports: [
    // Console log transport
    new winston.transports.Console({
      format: combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // File transport (optional, for logging to a file)
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export default logger;
