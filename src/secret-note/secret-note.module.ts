import { Module } from '@nestjs/common';
import { SecretNoteController } from './secret-note.controller';
import { SecretNoteService } from './secret-note.service';
import { SecretNote } from './secret-note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionService } from '../shared/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecretNote])],
  controllers: [SecretNoteController],
  providers: [SecretNoteService, EncryptionService],
})
export class SecretNoteModule {}
