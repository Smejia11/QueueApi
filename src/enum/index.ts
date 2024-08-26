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
  InconsistenciesReport = 'log_external_api_queue',
  LeadValoraQueue = 'leadValoraQueue',
  ScoringReportQueue = 'scoringReportQueue',
}

export enum LeadStates {
  COTIZADA = 'Cotizada',
  EMITIDA = 'Emitida',
  PENDIENTE = 'Pendiente',
  EN_INSPECCION = 'En Inspeccion',
  RE_INSPECCION = 'Re Inspeccion',
  RECHAZADA = 'Rechazada',
  VENCIDA = 'Vencida',
  EN_INTEGRACION = 'En Integracion',
  INTEGRADA = 'Integrada',
  NO_INTEGRADA = 'No integrada',
}

export enum LogsAction {
  INTEGRATION_VALORA = 'integracion valora',
  LEAD_UPDATE = 'Actualizacion lead',
}
