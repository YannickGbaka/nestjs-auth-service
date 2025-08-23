import {
  ValidateIf,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsNull } from 'typeorm';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  firstName?: string | undefined;

  @IsOptional()
  @IsString()
  lastName?: string | undefined;

  @IsOptional()
  @IsString()
  email?: string | undefined;

  @IsEnum(['USER', 'ADMIN'], {
    message: 'Role must be either USER or ADMIN',
  })
  @IsOptional()
  role?: 'USER' | 'ADMIN';

  @IsDateString()
  @IsOptional()
  birthDate?: string | undefined;
}
