import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getList() {
    return this.usersRepository.find({
      relations: {
        tasks: true,
      },
    });
  }

  getUserTasks(user: Partial<UserEntity>) {
    return this.usersRepository.find({
      where: { id: user.id },
      relations: {
        tasks: true,
      },
    });
  }

  async getMe(id: string) {
    return this.usersRepository.findOneBy({ id: id });
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
}
