import { ConnectionOptions } from 'bullmq';
import IORedis from 'ioredis';
import { getEnvVariable } from '../utils';

export const connectionRedis: ConnectionOptions = {
  host: getEnvVariable('REDIS_SERVER'),
  port: +(getEnvVariable('REDIS_PORT') || 6379),
};

export const connection = new IORedis({
  ...connectionRedis,
  db: 0,
  maxRetriesPerRequest: null,
});

export const concurrency = +(getEnvVariable('COCURRENT_WORKERS') || 8);
