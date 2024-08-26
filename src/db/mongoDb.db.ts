import mongoose, { ConnectOptions, Connection } from 'mongoose';
import { DatabaseConnection } from '../interfaces/';

class MongooseConnection implements DatabaseConnection {
  private connection: Connection | null;
  private mongoUri: string;

  constructor() {
    this.connection = null;
    this.mongoUri = '';
  }

  connect(
    mongoUri: string,
    connectOptions: ConnectOptions
  ): Promise<typeof mongoose> {
    this.mongoUri = mongoUri;
    return mongoose.connect(mongoUri, connectOptions);
  }

  createConnection(
    mongoUri: string,
    connectOptions: ConnectOptions
  ): Connection {
    this.mongoUri = mongoUri;
    this.connection = mongoose.createConnection(mongoUri, connectOptions);

    return this.connection;
  }

  getDbUri(): string {
    const match: RegExpMatchArray | null = this.mongoUri.match(
      /^mongodb\+srv:\/\/\w+:\w+@[\w\.]+\/(\w+)$/i
    );
    return Array.isArray(match) && match.length >= 2 ? match[1] : '';
  }

  async getDbs(): Promise<string[]> {
    try {
      const client = mongoose.connection.getClient();
      const admin = client.db().admin();
      const { databases } = await admin.listDatabases();
      return databases.map((db) => db.name);
    } catch (error) {
      throw error;
    }
  }
}

export default MongooseConnection;
