import { IsEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user.role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  @IsEmpty()
  username: string;

  @Column()
  @IsEmpty()
  password: string;

  @Column({ type: 'enum', array: true, enum: UserRole, default: [] })
  roles: UserRole[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ default: Date })
  @CreateDateColumn()
  created_at: Date;

  @Column({ default: Date })
  @UpdateDateColumn()
  updated_at: Date;
}
