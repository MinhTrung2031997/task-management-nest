import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async getTaskStatus(status: TaskStatus) {
    const query = this.createQueryBuilder('task').where(
      'user.firstName = :firstName',
      { status },
    );
    const photos = await query.getMany();
    return photos;
  }
}
