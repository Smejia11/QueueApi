import { ConnectOptions } from 'mongoose';
import MongooseConnection from './mongoDb.db';
import config from '../config';

const {
  db: { mongoUrl, maxPoolSize },
  serverSelectionTimeoutMS,
} = config;
class Database {
  constructor(private mongoDb: MongooseConnection) {}

  connect(): void {
    const options: ConnectOptions = {
      serverSelectionTimeoutMS,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      minPoolSize: 5,
      maxPoolSize,
    };

    this.mongoDb
      .connect(mongoUrl, options)
      .then(() =>
        console.log('Connection successfully established with the server')
      )
      .catch((error) => console.error(error));
  }
}

export default Database;
