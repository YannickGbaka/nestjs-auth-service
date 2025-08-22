import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userReposistory: Repository<User>,
  ) {}
  async getUsers() {
    return this.userReposistory.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userReposistory.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ForbiddenException('User already exist');
    }

    const userObject = this.userReposistory.create(createUserDto);

    const newUser = await this.userReposistory.save(userObject);
    return newUser;
  }
}
