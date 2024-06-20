import { ApiProperty } from '@nestjs/swagger';

export class CreateSecretNoteDto {
  @ApiProperty()
  note: string;
}
