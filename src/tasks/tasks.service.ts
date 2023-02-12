import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(body: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      title: body.title,
      description: body.description,
      status: TaskStatus.OPEN,
    });

    return this.taskRepository.save(task);
  }

  async updateTask(id: string, body: CreateTaskDto) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (!index) {
      throw new NotFoundException('The task not found');
    }
    this.tasks[index] = { ...this.tasks[index], ...body };
    return this.tasks[index];
  }

  async removeTask({ id }: { id: string }) {
    return this.tasks.filter((task) => task.id !== id);
  }
}
