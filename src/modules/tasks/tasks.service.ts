import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async createTask(body: CreateTaskDto) {
    const { title, description, status } = body;
    return this.tasksRepository.save({
      title,
      description,
      status: status ?? TaskStatus.OPEN,
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
