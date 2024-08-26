import path from 'path';
import { Config } from '../types';
import { getEnvVariable } from '../utils';

const config: Config = {
  env: getEnvVariable('NODE_ENV'),
  db: {
    mongoUrl: getEnvVariable('MONGO_URL'),
    db_prefix: getEnvVariable('DB_PREFIX'),
    db_quotation: getEnvVariable('DB_QUOTATION'),
    db_log: getEnvVariable('DB_LOG'),
    maxPoolSize: Number(getEnvVariable('MAX_POOL_SIZE') || 10),
  },
  port: getEnvVariable('PORT'),
  maxRateLimit: +getEnvVariable('MAX_RATE_LIMIT'),
  logger: {
    logFileDir: path.join(__dirname, '../log'),
  },
  cacheTTL: {
    Default: 600, // by default 10 min
    dashboardTTL: 600,
  },
  whiteList: getEnvVariable('WHITE_LIST_URL').split(','),
  tokens: {
    jwt: {
      jwtExpires: getEnvVariable('JWT_EXPIRES'),
      jwtSecret: getEnvVariable('JWT_SECRET'),
      jwtAlgorithm: getEnvVariable('JWT_ALGORITHM'),
    },
    jwtExternal: {
      jwtSecret: getEnvVariable('JWT_SECRET_SERVICES'),
      jwtAlgorithm: getEnvVariable('JWT_ALGORITHM_SERVICES'),
    },
  },
  REDIS: {
    redisServer: getEnvVariable('REDIS_SERVER'),
    port: getEnvVariable('REDIS_PORT'),
    db: Number(getEnvVariable('REDIS_DB')),
  },
  VALORA: {
    apiUrl: getEnvVariable('VALORA_API_URL'),
    apiKey: getEnvVariable('VALORA_API_KEY'),
  },
  EXTERNAL_QUOTING_METHODS: {
    quoteUrlLibra: getEnvVariable('QUOTEURL_LIBRA'),
    authUrlLibra: getEnvVariable('AUTH_URL_LIBRA'),
    grantTypeLibra: getEnvVariable('GRANT_TYPE_LIBRA'),
    usernameLibra: getEnvVariable('USERNAME_LIBRA'),
    passwordLibra: getEnvVariable('PASSWORD_LIBRA'),
    apiUrlLibra: getEnvVariable('API_URL_LIBRA'),
  },
  LOG_API: {
    logsApiUrlBase: getEnvVariable('URL_API_LOGS'),
  },
  serverSelectionTimeoutMS: Number(
    getEnvVariable('SERVER_SELECTION_TIMEOUT_MS')
  ),
  jobs: {
    deleteJobsTime: getEnvVariable('DELETE_JOBS_TIME'),
  },
};

export default config;
