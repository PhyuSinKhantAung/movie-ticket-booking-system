import { NotAuthorizedException } from "./../utils/http-exceptions.util";
import { NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "./authenticator";

const authorizor = function ({
  roles,
  types,
}: {
  roles: string[];
  types: string[];
}) {
  return async function (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!roles.includes(req.user.role) && !types.includes(req.user.type)) {
        return next(new NotAuthorizedException("Not Authorized to get access"));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorizor;
