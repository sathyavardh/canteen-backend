const winston = require('winston')

// Create a logger
export const logger = winston.createLogger({
  level: 'info', // Log levels: error, warn, info, http, verbose, debug, silly
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({
        level,
        message,
        timestamp
      }: {
        level: string
        message: string
        timestamp: string
      }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`
      }
    )
  ),
  transports: [
    new winston.transports.Console() // Logs to the console
  ]
})
