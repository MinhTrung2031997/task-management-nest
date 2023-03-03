import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private usersRepository: Repository<Task>,
  ) {}

  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.usersRepository.find();
  }

  async createTask(body: CreateTaskDto) {
    const { title, description, status } = body;
    return this.usersRepository.save({
      title,
      description,
      status: status ?? TaskStatus.OPEN,
    });
  }

  async updateTask(id: string, body: CreateTaskDto) {
    const task = await this.usersRepository.update({ id }, { ...body });

    if (!task.affected.valueOf()) {
      throw new NotFoundException('The task not found');
    }
    return task;
  }

  async removeTask({ id }: { id: string }) {
    const task = await this.usersRepository.delete({ id });
    if (!task.affected.valueOf()) {
      throw new NotFoundException('The task not found');
    }
    return task;
  }
}
