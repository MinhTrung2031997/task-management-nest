import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Auth } from './common/decorators/auth.decorator';
import { User } from './common/decorators/user.decorator';
import { Role } from './common/enums/role.enum';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { LocalAuthGuard } from './common/guards/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { UserEntity } from './modules/users/user.entity';

@Controller()
@ApiTags('Auth APIs')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getMe')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('admin')
  @Auth(Role.ADMIN)
  onlyAdmin(@User() user: Partial<UserEntity>) {
    return user;
  }

  @Get('user')
  @Auth(Role.USER)
  onlyUser(@User() user: Partial<UserEntity>) {
    return user;
  }

  @Get('issuer')
  @Auth(Role.ISSUER)
  onlyIssuer(@User() user: Partial<UserEntity>) {
    return user;
  }
}
