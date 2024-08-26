/* eslint-disable @typescript-eslint/no-explicit-any */
import pino from 'pino';
import PinoHttp from 'pino-http';
import { randomUUID } from 'crypto';
import logger from '../logger';

export const loggerMiddleware = () =>
  PinoHttp({
    logger: logger,
    genReqId: function (req, res) {
      const existingID = req.id ?? req.headers['x-request-id'];
      if (existingID) return existingID;
      const id = randomUUID();
      res.setHeader('X-Request-Id', id);
      return id;
    },
    level: process.env.NODE_ENV !== 'prod' ? 'debug' : 'info',
    formatters: {
      level: (label: any) => {
        return { level: label };
      },
    },
    serializers: {
      err: pino.stdSerializers.err,
      req(req: any) {
        req.body =
          process.env.NODE_ENV === 'prod'
            ? pino.stdSerializers.req
            : req.raw.body;
        return req;
      },
      res: pino.stdSerializers.res,
    },
    customAttributeKeys: {
      req: 'request',
      res: 'response',
      err: 'error',
      responseTime: 'timeTaken',
    },
    wrapSerializers: true,
    customReceivedMessage: function (req) {
      return `request ${req.id} received: ${req.method} ${req.url}`;
    },
    // Define a custom logger level
    customLogLevel: function (_req, res, err) {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn';
      } else if (res.statusCode >= 500 || err) {
        return 'error';
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        return 'silent';
      }
      return 'info';
    },
    customSuccessMessage: function (req) {
      return `${req.method} ${req.url} completed`;
    },
    customErrorMessage: function (req, res, err) {
      return `request ${req.id} to ${req.method} ${req.url} errored with status code: ${res.statusCode} message: ${err.message}`;
    },
  });
