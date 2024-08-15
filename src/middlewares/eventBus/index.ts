import { EventEmitter } from "stream";
import { UnsupportedCommandException } from "../../exceptions/unsupportedCommandException";
import {
  CommandData,
  SupportedCommands,
  supportedCommands,
} from "./commandActions";

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
  send(command: Command<CommandData>) {
    this.emit("command", command);
  }
}

const eventBus = new EventBus();

function execute(command: Command<unknown>) {
  const { type, data } = command;

  if (typeof supportedCommands[type] !== "function") {
    console.error("Supported commands:", supportedCommands);
    throw new UnsupportedCommandException("Command not supported");
  }

  supportedCommands[type](data);
}

eventBus.on("command", execute);

export default eventBus;
