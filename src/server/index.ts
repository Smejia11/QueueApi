import express from 'express';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import responseTime from 'response-time';

// Database
import Database from '../db';
import MongooseConnection from '../db/mongoDb.db';

import config from '../config';

import { CacheService } from '../services';
import { Routes } from '../enum';

//Middlewares
import {
  validatePermisionPolicy,
  helmetOptions,
  logErrors,
  errorHandler,
  boomErrorHandler,
  zodErrorHandler,
  initTasks as cronJobs,
  loggerMiddleware
} from '../middlewares/';

import { apiLimiter } from '../middlewares/';
import '../auth';
import '../queue/workers';

const {
  port,
  cacheTTL: { Default },
  whiteList = [] as string[],
} = config;

import routerPrivate from '../routes/privates';
import routerPublic from '../routes/publics';

const mongooseConnection = new MongooseConnection();
const dbs = new Database(mongooseConnection);
class Server {
  private app: express.Application;
  private port: string | number;
  private corsOptions: CorsOptions;
  private paths: any;
  private cache: any;

  constructor() {
    this.app = express();
    this.port = port;
    this.cache = new CacheService(Default);
    this.corsOptions = {
      origin: (origin: any, callback) => {
        if (whiteList.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('no permitido'));
        }
      },
    };

    this.paths = {
      /**
       * Para este servidor la unica ruta publicas sera "/" por
       * seguridad
       */
      public: `${Routes.serverOn}`,
      private: `${Routes.base}`,
    };

    this.DBConnection(), this.configurationServer();
    this.middleware();
    this.routes();
    this.jobs();
  }

  DBConnection() {
    dbs.connect();
  }

  middleware() {
    this.app.use(compression({
      level: 6,
      threshold: 100 * 1000,
      filter: (req, res) => {
        const noCompression = req.headers['x-no-compression'];
        if (noCompression) return false;
        return compression.filter(req, res);
      },
    }));
    this.app.use(responseTime());
    this.app.use(helmet(helmetOptions));
    this.app.use(validatePermisionPolicy);
    this.app.use(cors(this.corsOptions));
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(apiLimiter);
    this.app.use(loggerMiddleware());
    this.app.use(logErrors);
    this.app.use(zodErrorHandler);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }

  configurationServer() {
    this.app.set('trust proxy', 1);
    this.app.set('cacheProvider', this.cache);
  }

  routes() {
    /**
     * Para este servidor no se usan rutas publicas por
     * seguridad se deja comentada para que se tome como
     * base en el futuro
     */

    this.app.use(this.paths.public, routerPublic);
    this.app.use(
      this.paths.private,
      passport.authenticate(['jwtICNN', 'jwtExternal'], { session: false }),
      routerPrivate
    );
  }

  jobs() {
    cronJobs();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running through the port: ${this.port}`);
    });
  }
}

export default Server;
