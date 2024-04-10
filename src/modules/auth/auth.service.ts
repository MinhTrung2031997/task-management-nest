import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return this.usersService.validateUser(username, pass);
  }

  async login(user: Partial<UserEntity>) {
    const payload = {
      username: user.username,
      id: user.id,
      roles: user.roles,
      isActive: user.isActive,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
