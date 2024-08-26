import mongoose, { ConnectOptions, Connection } from 'mongoose';
export interface DatabaseConnection {
  connect(
    mongoUri: string,
    connectOptions: ConnectOptions
  ): Promise<typeof mongoose>;
  createConnection(
    mongoUri: string,
    connectOptions: ConnectOptions
  ): Connection;
  getDbUri(mongoUri: string): string;
}
