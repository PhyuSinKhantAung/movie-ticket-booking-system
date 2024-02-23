// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, Response } from "express";
// import { ParamsDictionary } from "express-serve-static-core";
// import { ParsedQs } from "qs";

import { NextFunction } from "express";

// type Callback<
//   Body = any,
//   Query extends ParsedQs = any,
//   Params extends ParamsDictionary = any,
//   ResBody = any,
//   Locals extends Record<string, any> = Record<string, any>,
// > = (
//   req: Request<Params, ResBody, Body, Query, Locals>,
//   res: Response,
//   next: NextFunction,
// ) => void | Promise<void>;

export default function (callback: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// import { NextFunction } from "express";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default function (fn: any) {
//   console.log("hi");
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch(next);
//   };
// }
