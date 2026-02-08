import type IUser from "./users.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
