import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(body: CreateTaskDto): Promise<Task> {
    const task: Task = {
      id: '1',
      title: body.title,
      description: body.description,
      status: body.status,
    };
    this.tasks.push(task);
    return task;
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
