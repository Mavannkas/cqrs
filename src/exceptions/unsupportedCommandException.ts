export class UnsupportedCommandException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsupportedCommandException";
  }
}
