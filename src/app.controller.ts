import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get application status' })
  @ApiResponse({ status: 200, description: 'Application is running' })
  getStatus() {
    return {
      message: 'NestJS API is running!',
      status: 'OK',
      timestamp: new Date().toISOString(),
      endpoints: {
        users: '/users',
        apiDocs: '/api',
        prismaStudio: 'http://localhost:5555'
      }
    };
  }
}
