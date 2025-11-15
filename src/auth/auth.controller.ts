import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { ApiResponseDto } from '../common/dto';
import { SignupDto, LoginDto } from './dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Signup new user' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: 201, description: 'Signup successful', type: ApiResponseDto })
  @ApiResponse({ status: 400, description: 'User already exists', type: ApiResponseDto })
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: false }) res: Response,
  ): Promise<void> {
    const result = await this.authService.signup(signupDto, res);
    res.status(result.statusCode).json(result);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful', type: ApiResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials', type: ApiResponseDto })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: false }) res: Response,
  ): Promise<void> {
    const result = await this.authService.login(loginDto, res);
    res.status(result.statusCode).json(result);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful', type: ApiResponseDto })
  async logout(@Res({ passthrough: false }) res: Response): Promise<void> {
    const result = await this.authService.logout(res);
    res.status(result.statusCode).json(result);
  }

  // @Get('me')
  // @ApiOperation({ summary: 'Get current user' })
  // @ApiResponse({ status: 200, description: 'User data', type: ApiResponseDto })
  // @ApiResponse({ status: 401, description: 'Unauthorized', type: ApiResponseDto })
  // async getCurrentUser(@Req() req: Request): Promise<ApiResponseDto> {
  //   try {
  //     // Get token from HttpOnly cookie
  //     const token = req.cookies?.access_token;
      
  //     if (!token) {
  //       return ApiResponseDto.error('No token provided', 401, 'Please login first');
  //     }

  //     const user = await this.authService.getCurrentUser(token);
      
  //     if (!user) {
  //       return ApiResponseDto.error('Invalid token', 401, 'Token is invalid or expired');
  //     }

  //     return ApiResponseDto.success('User data retrieved', user);

  //   } catch (error) {
  //     return ApiResponseDto.error('Failed to get user data', 500, error.message);
  //   }
  // }
}
