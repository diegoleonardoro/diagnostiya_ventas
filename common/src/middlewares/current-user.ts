import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

//We tell TS that inside of this Express project find the interface of Request that was already defined inside there, and add a new additional property to it (currentUser). We have to do this becauase the type of Request is alredy defined and it does not allow us to add new properties to it .
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Chequear si el usuario tienen un JSON web token en su sesion

  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    // agregar "payload" a la solicitud
    req.currentUser = payload;
  } catch (err) {}

  next();
};
