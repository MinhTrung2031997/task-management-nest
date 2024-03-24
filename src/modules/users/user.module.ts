import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [JwtService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
