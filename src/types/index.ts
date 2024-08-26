type configDb = {
  mongoUrl: string;
  db_prefix: string;
  db_quotation: string;
  db_log: string;
  maxPoolSize: number;
};

export type Config = {
  env: string;
  db: configDb;
  port: string | number;
  maxRateLimit: number;
  logger: {
    logFileDir: string;
  };
  cacheTTL: {
    Default: number;
    dashboardTTL: number;
  };
  whiteList: string[];
  tokens: {
    jwt: {
      jwtExpires: string | undefined;
      jwtSecret: string;
      jwtAlgorithm: string | undefined;
    };
    jwtExternal: {
      jwtSecret: string;
      jwtAlgorithm: string;
    };
  };
  REDIS: {
    redisServer: String;
    port: String;
    db: number;
  };
  VALORA: {
    apiUrl: string;
    apiKey: string;
  };
  EXTERNAL_QUOTING_METHODS: {
    quoteUrlLibra: string;
    authUrlLibra: string;
    grantTypeLibra: string;
    usernameLibra: string;
    passwordLibra: string;
    apiUrlLibra: string;
  };
  LOG_API: {
    logsApiUrlBase: string;
  };
  serverSelectionTimeoutMS: number;
  jobs: {
    deleteJobsTime: string;
  };
};
