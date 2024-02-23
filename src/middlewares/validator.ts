import { BadRequestException } from "../utils/http-exceptions.util";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

type ValidateOpts = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

const validator = (opts: ValidateOpts) => {
  return function (req: Request, res: Response, next: NextFunction) {
    let key: keyof ValidateOpts;
    for (key in opts) {
      const schema = opts[key];
      if (typeof schema !== "undefined") {
        const result = schema.safeParse(req[key]);
        if (!result.success) {
          return next(new BadRequestException("Validation Error"));
        }
        req[key] = result.data;
      }
    }
    next();
  };
};

export default validator;
