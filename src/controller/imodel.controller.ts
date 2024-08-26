import mongoose, {
  Aggregate,
  Model,
  Schema,
  ProjectionFields,
  FilterQuery,
  UpdateQuery,
} from 'mongoose';
import config from '../config';
import { IModelController } from '../interfaces';

const { db: { db_prefix } } = config;

export class ModelController<T> implements IModelController<T> {
  private model: Model<T>;

  constructor(dataBase:string = 'quotation',modelName: string, schemaUse: Schema) {
    const db = mongoose.connection.useDb(`${dataBase}${db_prefix}`);
    this.model = db.model<T>(modelName, schemaUse);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async find(
    data: Partial<T> | any,
    projectionParam?: ProjectionFields<T>
  ): Promise<T[]> {
    return this.model.find(data, projectionParam).sort({ _id: -1 }).exec();
  }

  async findOne(
    criteria: Partial<unknown>,
    projection: ProjectionFields<T> = {}
  ): Promise<T | null> {
    return this.model.findOne(criteria, projection).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async update(
    criteria: FilterQuery<T>,
    data: UpdateQuery<T>
  ): Promise<T | null> {
    return await this.model
      .findOneAndUpdate(criteria, data, { new: true })
      .exec();
  }

  async deleteById(id: any): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount === 1;
  }

  async delete(data: Partial<T> | any): Promise<boolean> {
    const result = await this.model.deleteOne(data).exec();
    return result.deletedCount === 1;
  }

  async bulkWrite(data: any) {
    return this.model.bulkWrite(data);
  }

  aggregate(): Aggregate<T[]> {
    return this.model.aggregate();
  }
}
