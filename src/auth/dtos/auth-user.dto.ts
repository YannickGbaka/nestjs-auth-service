import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
