import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../types/role.enum';
import { Roles } from '../decorators/role.decorator';
import { LoggingInteceptor } from '../interceptors/logging.interceptor';

@UseInterceptors(LoggingInteceptor)
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  profile(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getProfile(id);
  }

  @Patch(':id')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseIntPipe()) userId: number,
  ) {
    return await this.userService.updateUser(updateUserDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseIntPipe()) userId: number,
  ): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
