export enum Routes {
  base = '/api/v1',
  test = '/test',
  bgTask = '/bgtask',
  serverOn = '/',
}

export enum erroresHTTP {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

export const mensajesErroresHTTP: Record<number, string> = {
  [erroresHTTP.BadRequest]: 'Bad Request',
  [erroresHTTP.Unauthorized]: 'Unauthorized',
  [erroresHTTP.Forbidden]: 'Forbidden',
  [erroresHTTP.NotFound]: 'Not Found',
  [erroresHTTP.ServerError]: 'Server Error',
};


export enum StatesBgtask {
  ACTIVE = 'ACTIVE',
  STARTED = 'STARTED',
  WAITING = 'WAITING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
  DELAYED = 'DELAYED',
  PAUSED = 'PAUSED',
  PROCESSED = 'PROCESSED',
}

export enum queueNames {
  exampleQueue = 'exampleQueue',
}

