import { Response, NextFunction, Request } from 'express';
import { Schema } from 'joi';
import { escapeString, taskPayloadSchema } from '../validations';

export function validatorHandler(schema: Schema, property: string) {
  return (req: any, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      return res.status(400).json({ error });
    }

    next();
  };
}

export function validateAndEscapeTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { value, error } = taskPayloadSchema.validate(req.body, {
    stripUnknown: true,
  });

  if (error) return res.status(400).json({ error: error.message });

  req.body = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      if (typeof v === 'string') return [k, escapeString(v)];
      if (typeof v === 'object' && v !== null) {
        return [
          k,
          Object.fromEntries(
            Object.entries(v).map(([ik, iv]) => [
              ik,
              typeof iv === 'string' ? escapeString(iv) : iv,
            ]),
          ),
        ];
      }
      return [k, v];
    }),
  );

  next();
}
