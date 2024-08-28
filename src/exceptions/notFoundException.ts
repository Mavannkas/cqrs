import { HttpException } from "./httpException";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
    this.name = "NotFoundException";
  }
}
