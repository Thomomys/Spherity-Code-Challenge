import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretNotes } from './secret-note.entity';
import { CreateSecretNoteDto } from './secret-note.dto';
import { EncryptionService } from '../common/encryption.service';
import { ErrorResponse, MessageResponse } from '../common/response.type';

@Injectable()
export class SecretNoteService {
  constructor(
    @InjectRepository(SecretNotes)
    private secretNoteRepository: Repository<SecretNotes>,
    private encryptionService: EncryptionService,
  ) {}

  async create(createSecretNoteDto: CreateSecretNoteDto): Promise<SecretNotes> {
    const secretNote = new SecretNotes();
    secretNote.createdAt = new Date();
    secretNote.note = this.encryptionService.encrypt(createSecretNoteDto.note);
    return this.secretNoteRepository.save(secretNote);
  }

  async findAll(): Promise<SecretNotes[]> {
    return await this.secretNoteRepository.find();
  }

  async findOne(id: number): Promise<SecretNotes | ErrorResponse> {
    const secretNote = await this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!secretNote)
      return { statusCode: HttpStatus.NOT_FOUND, error: 'No record found' };

    secretNote.note = this.encryptionService.decrypt(secretNote.note);
    return secretNote;
  }

  async findOneEncrypted(id: number): Promise<SecretNotes | ErrorResponse> {
    const secretNote = await this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!secretNote)
      return { statusCode: HttpStatus.NOT_FOUND, error: 'No record found' };
    return secretNote;
  }

  async remove(id: number): Promise<MessageResponse | ErrorResponse> {
    const secretNote = await this.secretNoteRepository.delete(id);

    if (!secretNote.affected)
      return { statusCode: HttpStatus.NOT_FOUND, error: 'No record found' };

    return { statusCode: HttpStatus.OK, message: 'Successfully deleted' };
  }

  async update(
    id: number,
    updateSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNotes | ErrorResponse> {
    const secretNote = await this.secretNoteRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!secretNote)
      return { statusCode: HttpStatus.NOT_FOUND, error: 'No record found' };

    secretNote.note = this.encryptionService.encrypt(updateSecretNoteDto.note);
    return this.secretNoteRepository.save(secretNote);
  }
}
