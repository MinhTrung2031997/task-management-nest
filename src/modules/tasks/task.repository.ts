import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

export class TasksRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {
    super(
      tasksRepository.target,
      tasksRepository.manager,
      tasksRepository.queryRunner,
    );
  }
}
