import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PageMetaDto } from '../pagination/page-meta.dto';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { UserRepositoryInterface } from './user.interface';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepositoryInterface)
    private usersRepository: UsersRepository,
  ) {}

  async getList(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder
      .leftJoinAndSelect('user.tasks', 'task')
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(entities, pageMetaDto);
  }

  getUserTasks(user: Partial<UserEntity>) {
    return this.usersRepository.findOne({
      where: { id: user.id },
    });
  }

  async getMe(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async register(body: CreateUserDto) {
    const { username, password, roles } = body;

    const user = this.usersRepository.create({
      username,
      password,
      roles,
    });
    const resUser = await this.usersRepository.save(user);
    delete resUser.password;
    return resUser;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }
}
