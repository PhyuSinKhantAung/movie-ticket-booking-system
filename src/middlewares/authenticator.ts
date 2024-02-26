import { NextFunction, Request, Response } from "express";
import { NotAuthenticatedException } from "src/utils/http-exceptions.util";
import AuthController, { TokenPayload } from "src/controllers/auth.controller";
import AdminService from "src/services/admin.service";
import UserService from "src/services/user.service";

export interface IGetUserAuthInfoRequest extends Request {
  user: TokenPayload;
}

const authenticator = async function (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    // 1. check headers
    if (!req.headers.authorization) {
      return next(new NotAuthenticatedException());
    }
    const [tokenType, token] = req.headers.authorization.split(" ");

    // 2. check token
    if (tokenType !== "Bearer" || !token) {
      return next(
        new NotAuthenticatedException(
          "You are not logged in, please log in to get access",
        ),
      );
    }

    // 2. verify token
    const decoded: TokenPayload = await new AuthController().verifyToken({
      token,
      secret: process.env.ACCESS_TOKEN_SECRET
        ? String(process.env.ACCESS_TOKEN_SECRET)
        : "",
    });

    // 3. check user exists
    if (decoded.type === "user") {
      await new UserService().getById(decoded.id);
    } else if (decoded.type === "admin") {
      await new AdminService().getById(decoded.id);
    }

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticator;
