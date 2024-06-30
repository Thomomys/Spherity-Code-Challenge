import { ApiProperty } from '@nestjs/swagger';

export class CreateSecretNoteDto {
  @ApiProperty()
  note: string;
}

export class UpdateSecretNoteDto extends CreateSecretNoteDto {}

export class SecretNoteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  note: string;
}

export class SecretNoteListResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;
}
