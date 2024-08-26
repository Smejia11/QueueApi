import boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
// import config from '../config';

/* const { apiKey: apiKeyEnv } = config;

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  if (apiKey === apiKeyEnv) {
    next();
  }
  else{
    next(boom.unauthorized());
  }
} */

function checkAdminRole(req: Request, res: Response, next: NextFunction) {
  const user: any = req.headers.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.forbidden('se requieren permisos de administrador'));
  }
}

function checkRoles(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.headers.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('no estas autorizado'));
    }
  };
}

export {
  // checkApiKey,
  checkAdminRole,
  checkRoles,
};
