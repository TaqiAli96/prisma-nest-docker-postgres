import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponseDto } from '../common/dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: ApiResponseDto })
  @ApiResponse({ status: 500, description: 'Internal server error', type: ApiResponseDto })
  async findAll(): Promise<ApiResponseDto> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'User found', type: ApiResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ApiResponseDto })
  @ApiResponse({ status: 500, description: 'Internal server error', type: ApiResponseDto })
  async findOne(@Param('id') id: string): Promise<ApiResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: ApiResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: ApiResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ApiResponseDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ApiResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: ApiResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: ApiResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ApiResponseDto })
  async remove(@Param('id') id: string): Promise<ApiResponseDto> {
    return this.usersService.remove(id);
  }
}
