import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../../Guards/roles.guard';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    JwtService,
    TasksService,
    TasksRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [TasksService, TasksRepository],
})
export class TasksModule {}
