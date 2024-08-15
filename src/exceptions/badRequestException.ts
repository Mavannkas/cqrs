import { HttpException } from "./httpException";

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
    this.name = "BadRequestException";
  }
}