import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { User } from '../../decorators/user.decorator';
import { Role } from '../../enums/role.enum';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth(Role.ADMIN)
  getList() {
    return this.usersService.getList();
  }

  @Get('/tasks')
  @Auth(Role.USER, Role.ISSUER, Role.ADMIN)
  getUserTasks(@User() user: Partial<UserEntity>) {
    return this.usersService.getUserTasks(user);
  }

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.usersService.register(body);
  }
}
