import { ObjectId, Mixed } from 'mongoose';

export interface IApplicationInside {
  _id?: ObjectId | string;
  url: string;
  status: number;
  body: Mixed;
  response: Mixed;
  stacktrace: string;
  ip: string;
  timeResponse: number;
  method: string;
  userId: ObjectId | string | null;
  createdAt: Date | string;
}
