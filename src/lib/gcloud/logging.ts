import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston();

/**
 * Benson Home Solutions Centralized Logging (Gcloud Native)
 */
export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    loggingWinston,
  ],
});

export const logError = (error: Error, metadata?: any) => {
  logger.error(error.message, { ...metadata, stack: error.stack });
};

export const logInfo = (message: string, metadata?: any) => {
  logger.info(message, metadata);
};
