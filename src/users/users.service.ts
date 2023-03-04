import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getList() {
    return this.usersRepository.find();
  }

  async createUser(body: CreateUserDto) {
    const { username, password, roles } = body;
    return this.usersRepository.save({
      username,
      password,
      roles,
    });
  }
}
