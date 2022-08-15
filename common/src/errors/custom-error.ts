export abstract class CustomError extends Error {
  abstract statusCode: number; // property that subclasses need to have

  constructor(message: string) {
    super(message); // calling super() is like calling Error
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
