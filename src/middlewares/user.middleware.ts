import type { Request, Response, NextFunction } from "express";
import { getTokenInfo } from "../utils";
import type { TUser } from "../types";

// Extend the Request type to include a user property
interface CustomRequest extends Request {
  user?: TUser;
}

export class UserMiddleware {
  constructor() {}

  validateToken(req: CustomRequest, res: Response, next: NextFunction) {
    const token = getTokenInfo({ req });
    if (token?.is_valid_token) {
      // Assuming token contains user data like id, email, etc.
      req.user = token.user as TUser;

      return next();
    } else {
      return res.status(408).send({ error: "Unauthorized" });
    }
  }
}
