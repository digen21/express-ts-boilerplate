export default class ServerError extends Error {
  status: number;
  success: boolean;
  constructor({ message, status = 500, success = true }) {
    super(message);
    this.status = status;
    this.success = success;
    Error.captureStackTrace(this, this.constructor);
  }
}
