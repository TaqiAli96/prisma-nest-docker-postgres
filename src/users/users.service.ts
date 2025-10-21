import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../repositories/user/user.repository';
import { ApiResponseDto } from '../common/dto';
import { PasswordService } from '../auth/password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ApiResponseDto> {
    try {
      // Check if email already exists
      const existingUser = await this.userRepository.findByEmail(createUserDto.email);
      if (existingUser) {
        return ApiResponseDto.error('Email already exists', 409, 'A user with this email already exists');
      }

      // Hash the password before storing
      const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
      
      // Create user with hashed password
      const user = await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      // Remove password from response for security
      const { password, ...userWithoutPassword } = user;
      
      return ApiResponseDto.success('User created successfully', userWithoutPassword, 201);
    } catch (error) {
      return ApiResponseDto.error('Failed to create user', 400, error.message);
    }
  }

  async findAll(): Promise<ApiResponseDto> {
    try {
      const users = await this.userRepository.findAll();
      return ApiResponseDto.success('Users retrieved successfully', users);
    } catch (error) {
      return ApiResponseDto.error('Failed to retrieve users', 500, error.message);
    }
  }

  async findOne(id: number): Promise<ApiResponseDto> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        return ApiResponseDto.error('User not found', 404);
      }
      return ApiResponseDto.success('User retrieved successfully', user);
    } catch (error) {
      return ApiResponseDto.error('Failed to retrieve user', 500, error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponseDto> {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      return ApiResponseDto.success('User updated successfully', user);
    } catch (error) {
      return ApiResponseDto.error('Failed to update user', 400, error.message);
    }
  }

  async remove(id: number): Promise<ApiResponseDto> {
    try {
      const user = await this.userRepository.remove(id);
      return ApiResponseDto.success('User deleted successfully', user);
    } catch (error) {
      return ApiResponseDto.error('Failed to delete user', 400, error.message);
    }
  }

}
