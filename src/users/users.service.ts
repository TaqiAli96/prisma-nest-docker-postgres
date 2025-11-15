import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../repositories/user/user.repository';
import { ApiResponseDto } from '../common/dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<ApiResponseDto> {
    try {
      const users = await this.userRepository.findAll();
      return ApiResponseDto.success('Users retrieved successfully', users);
    } catch (error) {
      return ApiResponseDto.error('Failed to retrieve users', 500, error.message);
    }
  }

  async findOne(id: string): Promise<ApiResponseDto> {
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponseDto> {
    try {
      const user = await this.userRepository.update(id, updateUserDto);
      return ApiResponseDto.success('User updated successfully', user);
    } catch (error) {
      return ApiResponseDto.error('Failed to update user', 400, error.message);
    }
  }

  async remove(id: string): Promise<ApiResponseDto> {
    try {
      const user = await this.userRepository.remove(id);
      return ApiResponseDto.success('User deleted successfully', user);
    } catch (error) {
      return ApiResponseDto.error('Failed to delete user', 400, error.message);
    }
  }
}
