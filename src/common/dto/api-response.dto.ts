import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ description: 'Indicates if the operation was successful' })
  success: boolean;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'Response data payload' })
  data?: T;

  @ApiProperty({ description: 'Error details if any', required: false })
  error?: string;

  @ApiProperty({ description: 'HTTP status code' })
  statusCode: number;

  constructor(
    success: boolean,
    message: string,
    data?: T,
    statusCode: number = 200,
    error?: string,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.error = error;
  }

  static success<T>(message: string, data?: T, statusCode: number = 200): ApiResponseDto<T> {
    return new ApiResponseDto(true, message, data, statusCode);
  }

  static error(message: string, statusCode: number = 400, error?: string): ApiResponseDto {
    return new ApiResponseDto(false, message, undefined, statusCode, error);
  }
}
