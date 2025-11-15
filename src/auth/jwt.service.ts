import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  /**
   * Generate JWT token for user
   * @param userId - User ID
   * @param email - User email
   * @returns JWT token
   * @param userId - User ID this token belongs to which user
   * @param email - User email this token belongs to which user
   */
  async generateToken(userId: string, email: string): Promise<{ accessToken: string, refreshToken: string }> {
    // Create JWT payload with standard claims
    // sub: Subject (user ID) - JWT standard claim for identifying the token owner
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(userId, refreshToken);
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    // Calculate expiry date (3 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
      },
    });
  }

  /**
   * Set HttpOnly cookie with JWT token
  //  * @param res - Express response object
  //  * @param token - JWT token
  //  */
  // setTokenCookie(res: Response, token: string): void {
  //   res.cookie('access_token', token, {
  //     httpOnly: true,        // Cannot be accessed via JavaScript
  //     secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  //     sameSite: 'strict',    // CSRF protection
  //     maxAge: 24 * 60 * 60 * 1000, // 24 hours
  //     path: '/',             // Available for all routes
  //   });
  // }

  /**
   * Clear the token cookie (logout)
  //  * @param res - Express response object
  //  */
  // clearTokenCookie(res: Response): void {
  //   res.clearCookie('access_token', {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //     path: '/',
  //   });
  // }

  /**
   * Verify JWT token
   * @param token - JWT token
   * @returns Decoded payload or null
  //  */
  // verifyToken(token: string): any {
  //   try {
  //     return this.jwtService.verify(token);
  //   } catch (error) {
  //     return null;
  //   }
  // }
}
