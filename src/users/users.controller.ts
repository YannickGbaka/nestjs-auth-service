import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  //   @Post('')
  //   async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  //     console.log(createUserDto);
  //     return await this.userService.createUser(createUserDto);
  //   }
}
