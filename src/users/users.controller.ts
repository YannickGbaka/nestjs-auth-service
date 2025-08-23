import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseIntPipe()) userId: number,
  ) {
    return await this.userService.updateUser(updateUserDto, userId);
  }
}
