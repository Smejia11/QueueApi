/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { fromZodError } from 'zod-validation-error';
import { JsonErrorHandler } from '../interfaces/errors.interface';
import { erroresHTTP } from '../enum';
import config from '../config';

const { env } = config;

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  next(err);
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jsonError: JsonErrorHandler = {
    message: err.message,
  };

  if (['dev', 'uat'].includes(env)) {
    jsonError.stack = err.stack;
  }

  res.status(500).json(jsonError);
}

function boomErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function zodErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'ZodError') {
    const validationError = fromZodError(err);
    res.status(erroresHTTP.BadRequest).json(validationError);
  } else next(err);
}

export { logErrors, errorHandler, boomErrorHandler, zodErrorHandler };
