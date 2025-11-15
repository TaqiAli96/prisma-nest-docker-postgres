import { User } from '@prisma/client';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  remove(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findManyWithPagination(skip: number, take: number): Promise<User[]>;
  count(): Promise<number>;
}
