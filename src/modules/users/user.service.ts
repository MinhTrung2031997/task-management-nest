import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  // async getList(pageOptionsDto: PageOptionsDto) {
  //   const queryBuilder = this.usersRepository.createQueryBuilder('user');
  //   queryBuilder
  //     .leftJoinAndSelect('user.tasks', 'task')
  //     .orderBy('user.created_at', pageOptionsDto.order)
  //     .skip(pageOptionsDto.skip)
  //     .take(pageOptionsDto.take);

  //   const itemCount = await queryBuilder.getCount();
  //   const { entities } = await queryBuilder.getRawAndEntities();

  //   const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
  //   return new PageDto(entities, pageMetaDto);
  // }

  getUserTasks(user: Partial<UserEntity>) {
    return this.userRepository.findOne({
      where: { id: user.id },
      relations: {
        tasks: true,
      },
    });
  }

  async getMe(id: string) {
    return this.userRepository.findOneById({ id: id });
  }

  async register(body: CreateUserDto) {
    const { username, password, roles } = body;

    const user = this.userRepository.create({
      username,
      password,
      roles,
    });
    const resUser = await this.userRepository.save(user);
    delete resUser.password;
    return resUser;
  }
}
