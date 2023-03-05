import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import appConfig from '../config/app.config';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const bearer: string = request.headers.authorization;
    if (!bearer) {
      throw new UnauthorizedException('Token invalid');
    }
    const token: string = bearer.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token invalid');
    }

    try {
      const user = await this.jwtService.verify(token, {
        secret: appConfig().appSecret,
      });

      if (!user || !user.roles) {
        throw new UnauthorizedException('Verify token failed');
      }

      return requiredRoles.some((role) => user.roles.includes(role));
    } catch (error) {
      throw new UnauthorizedException('Verify token failed');
    }
  }
}
