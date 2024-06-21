import { Module } from '@nestjs/common';
import { SecretNoteController } from './secret-note.controller';
import { SecretNoteService } from './secret-note.service';
import { SecretNotes } from './secret-note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionService } from '../common/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecretNotes])],
  controllers: [SecretNoteController],
  providers: [SecretNoteService, EncryptionService],
})
export class SecretNoteModule {}
