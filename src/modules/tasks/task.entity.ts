import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { TaskStatus } from './task.status.enum';

@Entity({
  name: 'tasks',
})
export class TaskEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @Column({ default: Date })
  @CreateDateColumn()
  created_at: Date;

  @Column({ default: Date })
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: Partial<UserEntity>;
}
