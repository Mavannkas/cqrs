import { EventEmitter } from "stream";
import { UnsupportedCommandException } from "../../exceptions/unsupportedCommandException";

export interface Command<T> {
  type: string;
  data: T;
}

const eventEmitter = new EventEmitter();

function execute(command: Command<unknown>) {
  const { type, data } = command;
  if (!supportedCommands.includes(type)) {
    throw new UnsupportedCommandException("Command not supported");
  }

  supportedCommands[type](data);
}

eventEmitter.on("command", execute);

// Add this to express request as middleware
export default eventEmitter;
