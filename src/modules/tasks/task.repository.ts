import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
    super(
      tasksRepository.target,
      tasksRepository.manager,
      tasksRepository.queryRunner,
    );
  }
}
