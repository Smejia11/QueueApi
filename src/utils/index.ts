import { Model, model } from 'mongoose';
import https from 'https';
import http from 'http';
import pRetry from 'p-retry';

function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (typeof value !== 'string') {
    throw new Error(`Environment variable ${name} is missing or not a string.`);
  }
  return value;
}

function getModel<Document>(modelName: string): Model<Document> {
  return model<Document>(modelName);
}

function sleep(time: number = 3000) {
  return new Promise((resolve) => {
    let timeOut = null;

    if (timeOut) clearTimeout(timeOut);

    timeOut = setTimeout(() => resolve(true), time);
  });
}

const getPagination = (page: number = 1, size: number = 5) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const requestWithRetries = async (
  endpoint: any,
  optionsEp: any,
  maxAttempts: any,
  delayBetweenRetries: any
) => {
  const operation = await pRetry(
    async () => {
      try {
        const { headers, method, body } = optionsEp;
        const domain = new URL(endpoint);
        const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
          keepAlive: false,
        });
        const httpAgent = new http.Agent({
          keepAlive: true,
        });
        const options = {
          agent: domain.protocol === 'http:' ? httpAgent : httpsAgent,
          method,
          headers,
          body,
        };
        const response = await fetch(endpoint, options);
        return {
          status: response.status,
          data: await response.json(),
        };
      } catch (error: any) {
        throw new Error(error);
      }
    },
    {
      retries: maxAttempts - 1, // Se resta 1 ya que la operación inicial no se considera un intento de reintentar.
      factor: 2, // Factor de aumento para el retardo entre reintentos
      minTimeout: delayBetweenRetries, // Retardo mínimo entre reintentos en milisegundos
      maxTimeout: delayBetweenRetries, // Retardo máximo entre reintentos en milisegundos
      onFailedAttempt: (error: any) =>
        console.error(
          `El intento ${error.attemptNumber} ha fallado. Quedan ${error.retriesLeft} reintentos.`
        ),
    }
  );

  try {
    return operation;
  } catch (error: any) {
    console.error('Se agotaron los intentos. Error:', error);
    throw new Error(error);
  }
};

export { getModel, getEnvVariable, sleep, getPagination, requestWithRetries };
