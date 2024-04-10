import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/shared/base/base.entity';
import { UserEntity } from '../users/user.entity';
import { TaskStatus } from './task.status.enum';

@Entity({
  name: 'tasks',
})
export class TaskEntity extends BaseEntity {
  @Column()
  @Index()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @Index()
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: Partial<UserEntity>;
}
