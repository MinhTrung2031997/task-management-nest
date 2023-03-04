import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRole } from '../user.role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @IsOptional()
  isActive: boolean;
}
