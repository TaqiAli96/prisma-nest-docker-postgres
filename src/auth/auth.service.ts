import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user/user.repository';
import { PasswordService } from './password.service';
import { JwtAuthService } from './jwt.service';
import { Response } from 'express';
import { ApiResponseDto } from '../common/dto';
import { SignupDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  /**
   * Signup user with email and password
   * @param signupDto - Signup data transfer object
   * @param res - Express response object
   * @returns ApiResponseDto
   */
  async signup(signupDto: SignupDto, res: Response): Promise<ApiResponseDto> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(signupDto.email);
      if (existingUser) {
        return ApiResponseDto.error('User already exists', 400, 'Email is already registered');
      }

      // Hash password
      const hashedPassword = await this.passwordService.hashPassword(signupDto.password);

      // Create user
      const user = await this.userRepository.create({
        email: signupDto.email,
        password: hashedPassword,
      });

      // // Generate JWT token
      // const token = this.jwtAuthService.generateToken(user.id, user.email);

      // // Set HttpOnly cookie
      // this.jwtAuthService.setTokenCookie(res, token);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      return ApiResponseDto.success('Signup successful', {
        user: userWithoutPassword,
        message: 'Account created successfully'
      });

    } catch (error) {
      return ApiResponseDto.error('Signup failed', 500, error.message);
    }
  }

  /**
   * Login user with email and password
   * @param loginDto - Login data transfer object
   * @param res - Express response object
   * @returns ApiResponseDto
   */
  async login(loginDto: LoginDto, res: Response): Promise<ApiResponseDto> {
    try {
      // Find user by email
      const user = await this.userRepository.findByEmail(loginDto.email);
      if (!user) {
        return ApiResponseDto.error('Invalid credentials', 401, 'Email or password is incorrect');
      }

      // Verify password
      const isPasswordValid = await this.passwordService.comparePassword(loginDto.password, user.password);
      if (!isPasswordValid) {
        return ApiResponseDto.error('Invalid credentials', 401, 'Email or password is incorrect');
      }

      // Generate JWT tokens (accessToken and refreshToken)
      const { accessToken, refreshToken } = await this.jwtAuthService.generateToken(user.id, user.email);
      // Set HttpOnly cookie
      // this.jwtAuthService.setTokenCookie(res, accessToken);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      return ApiResponseDto.success('Login successful', {
        // user: userWithoutPassword,
        accessToken,
        refreshToken,
        // message: 'You are now logged in'
      });

    } catch (error) {
      return ApiResponseDto.error('Login failed', 500, error.message);
    }
  }

  /**
   * Logout user (clear cookie)
   * @param res - Express response object
   * @returns ApiResponseDto
   */
  async logout(res: Response): Promise<ApiResponseDto> {
    try {
      // Clear the HttpOnly cookie
      // this.jwtAuthService.clearTokenCookie(res);

      return ApiResponseDto.success('Logout successful', {
        message: 'You have been logged out'
      });

    } catch (error) {
      return ApiResponseDto.error('Logout failed', 500, error.message);
    }
  }

  /**
   * Get current user from token
   * @param token - JWT token
   * @returns User data or null
   */
  // async getCurrentUser(token: string) {
  //   try {
  //     const decoded = this.jwtAuthService.verifyToken(token);
  //     if (!decoded) {
  //       return null;
  //     }

  //     const user = await this.userRepository.findOne(decoded.sub);
  //     if (!user) {
  //       return null;
  //     }

  //     // Remove password from response
  //     const { password, ...userWithoutPassword } = user;
  //     return userWithoutPassword;

  //   } catch (error) {
  //     return null;
  //   }
  // }
}
