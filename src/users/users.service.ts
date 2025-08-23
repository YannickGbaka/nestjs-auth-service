import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { BcryptHashingProvider } from 'src/auth/bcrypt-hashing.provider';
import { UpdateUserDto } from './dtos/update-user.dto';
import { HashingProvider } from 'src/auth/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userReposistory: Repository<User>,
    private readonly bcryptProvider: BcryptHashingProvider,
    protected readonly hashingProvider: HashingProvider,
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

  async updateUser(body, id: number) {
    const user = await this.userReposistory.findOneBy({ id });
    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }

    user.birthDate = body.birthDate ?? user.birthDate;
    user.email = body.email ?? user.email;
    user.firstName = body.firstName ?? user.firstName;
    user.lastName = body.lastName ?? user.lastName;
    user.role = body.role ?? user.role;

    user.password = await this.hashingProvider.hashPassword(
      user.password ?? body.password,
    );

    return this.userReposistory.save(user);
  }
}
