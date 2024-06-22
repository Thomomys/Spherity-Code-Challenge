import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'The HTTP status code of the error',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'The error message',
    example: 'Resource not found',
  })
  error: string;
}

export class MessageResponseDto {
  @ApiProperty({
    description: 'The HTTP status code of the response',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'The response message',
    example: 'Resource created successfully',
  })
  message: string;
}
