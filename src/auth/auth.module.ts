import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt.service';
import { PasswordService } from './password.service';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [
    RepositoriesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
// Creates configuration dynamically at runtime
// Gets values from environment variables
// Returns configuration object for JWT module
// Runs when module initializes 
     useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRES_IN') || 24 * 60 * 60, // 24 hours
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, PasswordService],
  exports: [AuthService, JwtAuthService]
})
export class AuthModule {}
