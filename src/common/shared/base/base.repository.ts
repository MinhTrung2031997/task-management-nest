/* eslint-disable prettier/prettier */
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';
import { BaseRepositoryInterface } from './base.interface';

export abstract class BaseAbstractRepository<T extends BaseEntity>
  implements BaseRepositoryInterface<T>
{
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return this.entity.save(data);
  }

  public async saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.entity.save(data);
  }

  public create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  public createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  public async findOneById(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    return this.entity.findOneBy(options);
  }

  public async findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(filterCondition);
  }

  public async findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(relations);
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  public async remove(data: T): Promise<T> {
    return this.entity.remove(data);
  }

  public async delete(options: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.entity.delete(options);
  }

  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return this.entity.preload(entityLike);
  }

  public async findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(options);
  }

  public async findOneBy(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T | null> {
    return this.entity.findOneBy(where);
  }

  public async update(
    options: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.entity.update(options, partialEntity);
  }

  public createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<T> {
    return this.entity.createQueryBuilder(alias, queryRunner);
  }
}
