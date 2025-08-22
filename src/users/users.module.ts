import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BcryptHashingProvider } from 'src/auth/bcrypt-hashing.provider';
import { HashingProvider } from 'src/auth/hashing.provider';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  providers: [
    UsersService,
    BcryptHashingProvider,
    {
      provide: HashingProvider,
      useClass: BcryptHashingProvider,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
