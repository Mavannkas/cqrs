import PinoHttp from "pino-http";
import PinoPretty from "pino-pretty";

const LOG_LEVEL = process.env.LOG_LEVEL || "debug";

const logger = PinoHttp(
  { level: LOG_LEVEL },
  PinoPretty({ colorize: true })
);
export const log = logger.logger;
export default logger;
