import { Injectable, NotFoundException } from '@nestjs/common';
import { PageMetaDto } from '../pagination/page-meta.dto';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';
import { UserEntity } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TasksRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getListTasks(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TaskEntity>> {
    const queryBuilder = this.tasksRepository.createQueryBuilder('task');
    queryBuilder
      .orderBy('task.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async createTask(user: Partial<UserEntity>, body: CreateTaskDto) {
    const { title, description, status } = body;
    return this.tasksRepository.save({
      title,
      description,
      status: status ?? TaskStatus.OPEN,
      user,
    });
  }

  async updateTask(id: string, body: Partial<CreateTaskDto>) {
    const task = await this.tasksRepository.update({ id }, { ...body });

    if (!task.affected.valueOf()) {
      throw new NotFoundException('The task not found');
    }
    return task;
  }

  async removeTask({ id }: { id: string }) {
    const task = await this.tasksRepository.delete({ id });
    if (!task.affected.valueOf()) {
      throw new NotFoundException('The task not found');
    }
    return task;
  }
}
