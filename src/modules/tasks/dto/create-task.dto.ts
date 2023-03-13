import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.status.enum';

export class CreateTaskDto {
  @ApiProperty({
    nullable: false,
    name: 'tiltle',
    description: 'title of a task',
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    nullable: false,
    name: 'description',
    description: 'describe a task you must do.',
    type: String,
  })
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    default: TaskStatus.OPEN,
    name: 'status',
    description: 'status of a task',
    type: String,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
