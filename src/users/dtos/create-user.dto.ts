import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['USER', 'ADMIN'])
  role?: 'USER' | 'ADMIN';

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;
}
