import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskRepositoryInterface } from './task.interface';
import { TasksRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: TaskRepositoryInterface,
      useClass: TasksRepository,
    },
  ],
  exports: [TasksService],
})
export class TasksModule {}
