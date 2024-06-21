import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SecretNotes } from './secret-note.entity';
import { SecretNoteService } from './secret-note.service';
import { EncryptionService } from '../common/encryption.service';
import { DeleteResult, Repository } from 'typeorm';
import { ErrorResponse, MessageResponse } from 'src/common/response.type';
import { HttpStatus } from '@nestjs/common';

describe('SecretNoteService', () => {
  let service: SecretNoteService;
  let repository: Repository<SecretNotes>;
  let encryptionService: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretNoteService,
        {
          provide: getRepositoryToken(SecretNotes),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: EncryptionService,
          useValue: {
            encrypt: jest.fn(),
            decrypt: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SecretNoteService>(SecretNoteService);
    repository = module.get<Repository<SecretNotes>>(
      getRepositoryToken(SecretNotes),
    );
    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  describe('create', () => {
    it('should create a new secret note', async () => {
      const createSecretNoteDto = { note: 'This is a secret note' };
      const encryptedNote = 'Encrypted note';
      const savedSecretNote = {
        id: 1,
        createdAt: new Date(),
        note: encryptedNote,
      };

      jest.spyOn(encryptionService, 'encrypt').mockReturnValue(encryptedNote);
      jest.spyOn(repository, 'save').mockResolvedValue(savedSecretNote);

      const result = await service.create(createSecretNoteDto);

      expect(encryptionService.encrypt).toHaveBeenCalledWith(
        createSecretNoteDto.note,
      );
      expect(result).toEqual(savedSecretNote);
    });
  });

  describe('findAll', () => {
    it('should return all secret notes without the note', async () => {
      const secretNotes = [
        { id: 1, createdAt: new Date(), note: 'Encrypted note' },
        { id: 2, createdAt: new Date(), note: 'Encrypted note' },
      ];
      const expectedResult = [
        { id: 1, createdAt: new Date(), note: 'Encrypted note' },
        { id: 2, createdAt: new Date(), note: 'Encrypted note' },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(secretNotes);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a decrypted secret note', async () => {
      const encryptedNote = 'Encrypted note';
      const decryptedNote = 'Decrypted note';
      const secretNote = { id: 1, createdAt: new Date(), note: encryptedNote };
      const expectedResult = {
        id: 1,
        createdAt: new Date(),
        note: decryptedNote,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(secretNote);
      jest.spyOn(encryptionService, 'decrypt').mockReturnValue(decryptedNote);
      const result = await service.findOne(1);

      expect(encryptionService.decrypt).toHaveBeenCalledWith(encryptedNote);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOneEncrypted', () => {
    it('should return a encrypted secret note', async () => {
      const secretNote = {
        id: 1,
        createdAt: new Date(),
        note: 'Encrypted note',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(secretNote);
      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(secretNote);
    });
  });

  describe('update', () => {
    it('should return a updated secret note', async () => {
      const createSecretNoteDto = { note: 'This is a secret note' };
      const encryptedNote = 'Encrypted note';
      const secretNote = {
        id: 1,
        createdAt: new Date(),
        note: 'Stored note',
      };
      const savedSecretNote = {
        id: 1,
        createdAt: new Date(),
        note: encryptedNote,
      };

      jest.spyOn(encryptionService, 'encrypt').mockReturnValue(encryptedNote);
      jest.spyOn(repository, 'save').mockResolvedValue(savedSecretNote);
      jest.spyOn(repository, 'findOne').mockResolvedValue(secretNote);

      const result = await service.update(1, createSecretNoteDto);

      expect(result).toEqual(savedSecretNote);
      expect(encryptionService.encrypt).toHaveBeenCalledWith(
        createSecretNoteDto.note,
      );
      expect(repository.save).toHaveBeenCalledWith(savedSecretNote);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
  describe('remove', () => {
    it('should return a success message', async () => {
      const secretNote: DeleteResult = {
        raw: {
          id: 1,
          createdAt: new Date(),
          note: 'Stored note',
        },
        affected: 1,
      };
      const successMessage: MessageResponse = {
        statusCode: HttpStatus.OK,
        message: 'Successfully deleted',
      };

      jest.spyOn(repository, 'delete').mockResolvedValue(secretNote);

      const result = await service.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(successMessage);
    });
  });
});
