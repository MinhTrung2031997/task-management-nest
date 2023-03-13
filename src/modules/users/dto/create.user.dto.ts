import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { UserRole } from '../user.role.enum';

export class CreateUserDto {
  @ApiProperty({
    title: 'username',
    description: 'An user name of user',
  })
  @IsNotEmpty()
  @Type(() => String)
  username: string;

  @ApiProperty({
    title: 'password',
    description: 'a password of user',
  })
  @Min(8)
  @Max(16)
  @Type(() => String)
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    title: 'roles',
    description: 'roles of a user',
    enum: UserRole,
    default: [],
  })
  @Min(8)
  @Max(16)
  @IsOptional()
  @Type(() => Array)
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @Type(() => Boolean)
  isActive: boolean;
}
