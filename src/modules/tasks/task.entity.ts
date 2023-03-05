import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from './task.status.enum';

@Entity()
export class Task {
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
}
