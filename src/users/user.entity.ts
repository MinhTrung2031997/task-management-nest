import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import {
  BeforeInsert,
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
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
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

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException(
          'there are some issiue in the hash',
        );
      }
    }
  }
}
