export class HttpException extends Error {
  statusCode: number;
  message: string;
  name: string;

  constructor(statusCode: number, message: string, name: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request") {
    super(400, message, "BadRequestException");
  }
}
export class NotAuthenticatedException extends HttpException {
  constructor(message = "Not Authenticated") {
    super(401, message, "NotAuthenticatedException");
  }
}

export class NotAuthorizedException extends HttpException {
  constructor(message = "Not Authorized") {
    super(403, message, "NotAuthorizedException");
  }
}
export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(403, message, "ForbiddenException");
  }
}
export class ContentNotFoundException extends HttpException {
  constructor(message = "Content Not Found") {
    super(404, message, "ContentNotFoundException");
  }
}

export class ExistenceConflictException extends HttpException {
  constructor(message = "Already Exists") {
    super(409, message, "ExistenceConflictException");
  }
}

export class InternalServerException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(500, message, "InternalServerException");
  }
}
