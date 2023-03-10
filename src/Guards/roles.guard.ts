import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (!requiredRoles) {
  //     return true;
  //   }
  //   const req = context.switchToHttp().getRequest();
  //   console.log(req.user);

  //   // if (!bearer) {
  //   //   throw new UnauthorizedException('Token invalid');
  //   // }
  //   // const token: string = bearer.split(' ')[1];

  //   // if (!token) {
  //   //   throw new UnauthorizedException('Token invalid');
  //   // }

  //   // try {
  //   //   const user = await this.jwtService.verify(token, {
  //   //     secret: appConfig().appSecret,
  //   //   });

  //   //   if (!user || !user.roles) {
  //   //     throw new UnauthorizedException('Verify token failed');
  //   //   }

  //   //   return requiredRoles.some((role) => user.roles.includes(role));
  //   // } catch (error) {
  //   //   throw new UnauthorizedException('Verify token failed');
  //   // }
  handleRequest(_err: any, user: any, _info: any, context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    if (!user) {
      throw new UnauthorizedException('Token is invalid.');
    }

    if (!user.roles || !requiredRoles.some((r) => user.roles.includes(r))) {
      throw new ForbiddenException(
        "You don't have permission to perform this action",
      );
    }

    return user;
  }
}
