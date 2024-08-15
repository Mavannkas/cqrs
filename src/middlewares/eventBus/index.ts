import { EventEmitter } from "stream";
import { UnsupportedCommandException } from "../../exceptions/unsupportedCommandException";
import { SupportedCommands, supportedCommands } from "./commandActions";

declare global {
  namespace Express {
    interface Request {
      eventBus: EventBus;
    }
  }
}

export interface Command<T> {
  type: SupportedCommands;
  data: T;
}
class EventBus extends EventEmitter {
  send(command: Command<unknown>) {
    this.emit("command", command);
  }
}

const eventBus = new EventBus();

function execute(command: Command<unknown>) {
  const { type, data } = command;

  if (!supportedCommands[type]) {
    console.error("Supported commands:", supportedCommands);
    throw new UnsupportedCommandException("Command not supported");
  }

  supportedCommands[type](data);
}

eventBus.on("command", execute);

export default eventBus;
