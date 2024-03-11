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
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../common/decorators/auth.decorator';
import { User } from '../../common/decorators/user.decorator';
import { Role } from '../../common/enums/role.enum';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';
import { UserEntity } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('Task APIs')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @Auth(Role.ADMIN)
  async getListTasks(
    @Query()
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TaskEntity>> {
    return this.tasksService.getListTasks(pageOptionsDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {}

  @Post()
  @Auth(Role.USER, Role.ADMIN, Role.ISSUER)
  async createTask(
    @User() user: Partial<UserEntity>,
    @Body() body: CreateTaskDto,
  ) {
    return this.tasksService.createTask(user, body);
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
