import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;
}

export class MessageResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
