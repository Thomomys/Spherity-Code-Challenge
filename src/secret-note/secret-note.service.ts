import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretNote } from './secret-note.entity';
import { CreateSecretNoteDto } from './secret-note.dto';
import { EncryptionService } from '../shared/encryption.service';

@Injectable()
export class SecretNoteService {
  constructor(
    @InjectRepository(SecretNote)
    private secretNoteRepository: Repository<SecretNote>,
    private encryptionService: EncryptionService,
  ) {}

  async create(createSecretNoteDto: CreateSecretNoteDto): Promise<SecretNote> {
    const secretNote = new SecretNote();
    console.log('|-| ---', secretNote);
    secretNote.encryptedNote = this.encryptionService.encrypt(
      createSecretNoteDto.note,
    );
    return this.secretNoteRepository.save(secretNote);
  }

  async findAll(): Promise<SecretNote[]> {
    return this.secretNoteRepository.find();
  }

  async findOne(id: number): Promise<SecretNote> {
    const secretNote = await this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });

    if (secretNote) {
      secretNote.note = this.encryptionService.decrypt(
        secretNote.encryptedNote,
      );
    }

    return secretNote;
  }

  async findOneEncrypted(id: number): Promise<SecretNote> {
    return this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.secretNoteRepository.delete(id);
  }

  async update(
    id: number,
    updateSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNote> {
    const secretNote = await this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });
    secretNote.encryptedNote = this.encryptionService.encrypt(
      updateSecretNoteDto.note,
    );
    return this.secretNoteRepository.save(secretNote);
  }
}
