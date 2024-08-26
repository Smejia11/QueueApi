import { FilterQuery, UpdateQuery } from 'mongoose';
export interface IModelController<T> {
  create(data: Partial<T>): Promise<T>;
  find(data: Partial<T>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findOne(data: Partial<T>, projection?: Partial<T>): Promise<T | null>;
  updateById(id: string, data: Partial<T>): Promise<T | null>;
  update(criteria: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  delete(data: Partial<T>): Promise<boolean>;
}
