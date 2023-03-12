import { Column, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from '../abstract.entity';
import { UserEntity } from '../users/user.entity';
import { TaskStatus } from './task.status.enum';

@Entity({
  name: 'tasks',
})
export class TaskEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @Column({ default: Date })
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: Partial<UserEntity>;
}
