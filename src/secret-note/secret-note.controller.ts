import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessageResponse, ErrorResponse } from '../common/response.type';
import { SecretNoteService } from './secret-note.service';
import { CreateSecretNoteDto } from './secret-note.dto';
import { SecretNotes, SecretNotesWithoutNote } from './secret-note.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();
const version = process.env.VERSION;

@ApiTags('Secret Notes')
@Controller(`api/${version}/note`)
export class SecretNoteController {
  constructor(private readonly secretNoteService: SecretNoteService) {}

  @ApiOperation({ summary: 'Create a new secret note' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SecretNotes })
  @Post()
  async create(
    @Body() createSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNotes> {
    return await this.secretNoteService.create(createSecretNoteDto);
  }

  @ApiOperation({ summary: 'Get all secret note' })
  @ApiResponse({ status: HttpStatus.OK, type: [SecretNotesWithoutNote] })
  @Get()
  async findAll(): Promise<SecretNotesWithoutNote[]> {
    const secretNotes = await this.secretNoteService.findAll();
    return secretNotes.map((secretNote) => ({
      id: secretNote.id,
      createdAt: secretNote.createdAt,
    }));
  }

  @ApiOperation({ summary: 'Get a decrypted secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: SecretNotes })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponse })
  @Get('decrypted/:id')
  async findOne(@Param('id') id: number): Promise<SecretNotes | ErrorResponse> {
    return this.secretNoteService.findOne(id);
  }

  @ApiOperation({ summary: 'Get a encrypted secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: SecretNotes })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponse })
  @Get('encrypted/:id')
  async findOneEncrypted(
    @Param('id') id: number,
  ): Promise<SecretNotes | ErrorResponse> {
    return this.secretNoteService.findOneEncrypted(id);
  }

  @ApiOperation({ summary: 'Delete a secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: MessageResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponse })
  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ): Promise<MessageResponse | ErrorResponse> {
    return this.secretNoteService.remove(id);
  }

  @ApiOperation({ summary: 'Update a secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: SecretNotes })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponse })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNotes | ErrorResponse> {
    return this.secretNoteService.update(id, updateSecretNoteDto);
  }
}
