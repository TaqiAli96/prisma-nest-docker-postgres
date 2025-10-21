import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponseDto } from '../common/dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully', type: ApiResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: ApiResponseDto })
  @ApiResponse({ status: 409, description: 'Email already exists', type: ApiResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users', type: ApiResponseDto })
  @ApiResponse({ status: 500, description: 'Internal server error', type: ApiResponseDto })
  async findAll(): Promise<ApiResponseDto> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'User found', type: ApiResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ApiResponseDto })
  @ApiResponse({ status: 500, description: 'Internal server error', type: ApiResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: ApiResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: ApiResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ApiResponseDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<ApiResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'User deleted successfully', type: ApiResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request', type: ApiResponseDto })
  @ApiResponse({ status: 404, description: 'User not found', type: ApiResponseDto })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponseDto> {
    return this.usersService.remove(id);
  }
}
