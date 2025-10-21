import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PasswordService } from '../auth/password.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
})
export class UsersModule {}
