import { NextFunction, Request, Response } from "express";
import { HttpException } from "src/utils/http-exceptions.util";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (error instanceof HttpException) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  } else if (error instanceof Error) {
    console.group("[SERVER ERROR]: ", error.message);
    console.error("[STACK]: ", error.stack);
    console.error("[REQ BODY]: ", req.body);
    console.groupEnd();
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
