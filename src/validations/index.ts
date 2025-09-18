import Joi from 'joi';

export const taskPayloadSchema = Joi.object({
  queue: Joi.string().trim().required(),
  taskName: Joi.string().trim().required(),
  data: Joi.any().allow(null),
});

export function escapeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const paramsSchema = Joi.object({
  id: Joi.string().required(),
  queue: Joi.string().trim().lowercase().required(),
  taskName: Joi.string().trim().required(),
});
