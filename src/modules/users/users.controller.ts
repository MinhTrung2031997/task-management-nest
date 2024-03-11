import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Auth } from '../../common/decorators/auth.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Role } from '../../common/enums/role.enum';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User APIs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: 'Get all user by admin' })
  @ApiOkResponse({ status: 200, description: 'Return a list of user' })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Unauthorization',
  })
  @Get()
  @Auth(Role.ADMIN)
  getList(
    @Query()
    pageOptionsDto: PageOptionsDto,
  ) {
    return this.usersService.getList(pageOptionsDto);
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
