import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(
    @Query()
    filerDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {}

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.tasksService.createTask(body);
  }

  @Put('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: CreateTaskDto,
  ) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete('/:id')
  removeTask(@Param('id', ParseIntPipe) id: string) {
    return this.tasksService.removeTask({ id });
  }
}
