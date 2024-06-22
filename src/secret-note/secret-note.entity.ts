import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SecretNotes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'text' })
  note: string;
}
