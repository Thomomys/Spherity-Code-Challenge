import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SecretNotes } from './secret-note.entity';
import { SecretNoteController } from './secret-note.controller';
import { SecretNoteService } from './secret-note.service';
import { EncryptionService } from '../common/encryption.service';
import { HttpStatus } from '@nestjs/common';

describe('SecretNoteController', () => {
  let controller: SecretNoteController;
  let service: SecretNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretNoteController],
      providers: [
        SecretNoteService,
        {
          provide: getRepositoryToken(SecretNotes),
          useValue: {
            create: jest.fn(),
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

    controller = module.get<SecretNoteController>(SecretNoteController);
    service = module.get<SecretNoteService>(SecretNoteService);
  });

  describe('create', () => {
    it('should create a new secret note', async () => {
      const createSecretNoteDto = { note: 'This is a secret note' };
      const savedSecretNote = {
        id: 1,
        createdAt: new Date(),
        note: 'Encrypted note',
      };
      jest.spyOn(service, 'create').mockResolvedValue(savedSecretNote);

      const result = await controller.create(createSecretNoteDto);

      expect(service.create).toHaveBeenCalledWith(createSecretNoteDto);
      expect(result).toEqual(savedSecretNote);
    });
  });

  describe('findAll', () => {
    it('should return all secret notes without the note', async () => {
      const secretNotes = [
        { id: 1, createdAt: new Date(), note: 'First encrypted note' },
        { id: 2, createdAt: new Date(), note: 'Second encrypted note' },
      ];
      const secretNotesWithoutNote = [
        { id: 1, createdAt: new Date() },
        { id: 2, createdAt: new Date() },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(secretNotes);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(secretNotesWithoutNote);
    });
  });

  describe('findOne', () => {
    it('should return a decrypted secret note', async () => {
      const secretNote = {
        id: 1,
        createdAt: new Date(),
        note: 'Decrypted note',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(secretNote);

      const result = await controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(secretNote);
    });
  });

  describe('findOneEncrypted', () => {
    it('should return an encrypted secret note', async () => {
      const secretNote = {
        id: 1,
        createdAt: new Date(),
        note: 'Encrypted note',
      };
      jest.spyOn(service, 'findOneEncrypted').mockResolvedValue(secretNote);

      const result = await controller.findOneEncrypted(1);

      expect(service.findOneEncrypted).toHaveBeenCalledWith(1);
      expect(result).toEqual(secretNote);
    });
  });

  describe('remove', () => {
    it('should delete a secret note', async () => {
      const successMessage = {
        statusCode: HttpStatus.OK,
        message: 'Successfully deleted',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(successMessage);

      const result = await controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(successMessage);
    });
  });

  describe('update', () => {
    it('should update a secret note', async () => {
      const updateSecretNoteDto = { note: 'Updated secret note' };
      const updatedSecretNote = {
        id: 1,
        createdAt: new Date(),
        note: 'Encrypted updated note',
      };
      jest.spyOn(service, 'update').mockResolvedValue(updatedSecretNote);

      const result = await controller.update(1, updateSecretNoteDto);

      expect(service.update).toHaveBeenCalledWith(1, updateSecretNoteDto);
      expect(result).toEqual(updatedSecretNote);
    });
  });
});
