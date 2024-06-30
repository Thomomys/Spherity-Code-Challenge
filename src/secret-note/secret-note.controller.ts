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
import { MessageResponseDto, ErrorResponseDto } from '../response/response.dto';
import { SecretNoteService } from './secret-note.service';
import {
  CreateSecretNoteDto,
  UpdateSecretNoteDto,
  SecretNoteResponseDto,
  SecretNoteListResponseDto,
} from './secret-note.dto';
import { SecretNotes } from './secret-note.entity';
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
  @ApiResponse({ status: HttpStatus.OK, type: [SecretNoteListResponseDto] })
  @Get()
  async findAll(): Promise<SecretNoteListResponseDto[]> {
    const secretNotes = await this.secretNoteService.findAll();
    return secretNotes.map((secretNote) => ({
      id: secretNote.id,
      createdAt: secretNote.createdAt,
    }));
  }

  @ApiOperation({ summary: 'Get a decrypted secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: SecretNoteResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDto })
  @Get('decrypted/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<SecretNoteResponseDto | ErrorResponseDto> {
    return this.secretNoteService.findOne(id);
  }

  @ApiOperation({ summary: 'Get a encrypted secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: SecretNoteResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDto })
  @Get('encrypted/:id')
  async findOneEncrypted(
    @Param('id') id: number,
  ): Promise<SecretNoteResponseDto | ErrorResponseDto> {
    return this.secretNoteService.findOneEncrypted(id);
  }

  @ApiOperation({ summary: 'Delete a secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: MessageResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDto })
  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ): Promise<MessageResponseDto | ErrorResponseDto> {
    return this.secretNoteService.remove(id);
  }

  @ApiOperation({ summary: 'Update a secret note by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: SecretNoteResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDto })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSecretNoteDto: UpdateSecretNoteDto,
  ): Promise<SecretNoteResponseDto | ErrorResponseDto> {
    return this.secretNoteService.update(id, updateSecretNoteDto);
  }
}
