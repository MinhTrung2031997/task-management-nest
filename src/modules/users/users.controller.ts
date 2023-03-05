import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  getList() {
    return this.usersService.getList();
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
