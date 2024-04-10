import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/shared/base/base.entity';
import { TaskEntity } from '../tasks/task.entity';
import { UserRole } from './user.role.enum';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Column({ type: 'enum', array: true, enum: UserRole, default: [] })
  roles: UserRole[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

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
