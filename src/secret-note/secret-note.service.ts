import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretNotes, SecretNotesWithoutNote } from './secret-note.entity';
import { CreateSecretNoteDto } from './secret-note.dto';
import { EncryptionService } from '../shared/encryption.service';

@Injectable()
export class SecretNoteService {
  constructor(
    @InjectRepository(SecretNotes)
    private secretNoteRepository: Repository<SecretNotes>,
    private encryptionService: EncryptionService,
  ) {}

  async create(createSecretNoteDto: CreateSecretNoteDto): Promise<SecretNotes> {
    const secretNote = new SecretNotes();
    secretNote.note = this.encryptionService.encrypt(createSecretNoteDto.note);
    return this.secretNoteRepository.save(secretNote);
  }

  async findAll(): Promise<SecretNotesWithoutNote[]> {
    const secretNotes = await this.secretNoteRepository.find();
    const result = secretNotes.map((value) => ({
      id: value.id,
      createdAt: value.createdAt,
    }));
    return result;
  }

  async findOne(id: number): Promise<SecretNotes> {
    const secretNote = await this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });

    if (secretNote) {
      secretNote.note = this.encryptionService.decrypt(secretNote.note);
    }

    return secretNote;
  }

  async findOneEncrypted(id: number): Promise<SecretNotes> {
    return this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number): Promise<String> {
    await this.secretNoteRepository.delete(id);
    return 'Successfully deleted.';
  }

  async update(
    id: number,
    updateSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNotes> {
    const secretNote = await this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });
    secretNote.note = this.encryptionService.encrypt(updateSecretNoteDto.note);
    return this.secretNoteRepository.save(secretNote);
  }
}
