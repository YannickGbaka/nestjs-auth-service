import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { BcryptHashingProvider } from 'src/auth/bcrypt-hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userReposistory: Repository<User>,
    private readonly bcryptProvider: BcryptHashingProvider,
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

    createUserDto.password = await this.bcryptProvider.hashPassword(
      createUserDto.password,
    );
    const userObject = this.userReposistory.create(createUserDto);

    const newUser = await this.userReposistory.save(userObject);
    return newUser;
  }
}
