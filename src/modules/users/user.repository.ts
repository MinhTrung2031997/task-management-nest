import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepositoryInterface } from '../../common/shared/base/base.interface';
import { BaseAbstractRepository } from '../../common/shared/base/base.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository
  extends BaseAbstractRepository<UserEntity>
  implements BaseRepositoryInterface<UserEntity>
{
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }
}
