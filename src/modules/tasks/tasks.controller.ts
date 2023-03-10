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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../Guards/jwt-auth.guard';
import { RolesGuard } from '../../Guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../../decorators/user.decorator';
import { Role } from '../../enums/role.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Roles(Role.USER)
  async getAllTasks(
    @User() user,

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
    @Body() body: Partial<CreateTaskDto>,
  ) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete('/:id')
  removeTask(@Param('id', ParseIntPipe) id: string) {
    return this.tasksService.removeTask({ id });
  }
}
