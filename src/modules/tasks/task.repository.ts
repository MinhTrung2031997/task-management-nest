import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepositoryInterface } from '../../common/shared/base/base.interface';
import { BaseAbstractRepository } from '../../common/shared/base/base.repository';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksRepository
  extends BaseAbstractRepository<TaskEntity>
  implements BaseRepositoryInterface<TaskEntity>
{
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
    super(tasksRepository);
  }
}
