import { IsOptional, IsString } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  options?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
