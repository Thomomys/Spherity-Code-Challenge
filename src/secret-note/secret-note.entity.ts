import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SecretNotes {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @Column({ type: 'text' })
  note: string;
}

export class SecretNotesWithoutNote {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;
}
