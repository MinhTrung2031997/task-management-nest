import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { RolesGuard } from './Guards/roles.guard';
import { AppService } from './app.service';
import { Roles } from './decorators/roles.decorator';
import { User } from './decorators/user.decorator';
import { Role } from './enums/role.enum';
import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { User as UserModel } from './modules/users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
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
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(Role.ADMIN)
  @Get('admin')
  onlyAdmin(@Request() req, @User() user: Partial<UserModel>) {
    return user;
  }
}
