import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SecretNoteService } from './secret-note.service';
import { CreateSecretNoteDto } from './secret-note.dto';
import { SecretNotes, SecretNotesWithoutNote } from './secret-note.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Secret Notes')
@Controller('api/v1/note')
export class SecretNoteController {
  constructor(private readonly secretNoteService: SecretNoteService) {}

  @ApiOperation({ summary: 'Create a new secret note' })
  @ApiResponse({ status: 201, type: SecretNotes })
  @Post()
  async create(
    @Body() createSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNotes> {
    return this.secretNoteService.create(createSecretNoteDto);
  }

  @ApiOperation({ summary: 'Get all secret note' })
  @ApiResponse({ status: 200, type: [SecretNotes] })
  @Get()
  async findAll(): Promise<SecretNotesWithoutNote[]> {
    return this.secretNoteService.findAll();
  }

  @ApiOperation({ summary: 'Get a decrypted secret note by ID' })
  @ApiResponse({ status: 200, type: SecretNotes })
  @Get('decrypt/:id')
  async findOne(@Param('id') id: number): Promise<SecretNotes> {
    return this.secretNoteService.findOne(id);
  }

  @ApiOperation({ summary: 'Get a encrypted secret note by ID' })
  @ApiResponse({ status: 200, type: SecretNotes })
  @Get('encrypt/:id')
  async findOneEncrypted(@Param('id') id: number): Promise<SecretNotes> {
    return this.secretNoteService.findOneEncrypted(id);
  }

  @ApiOperation({ summary: 'Delete a secret note by ID' })
  @ApiResponse({ status: 200, type: String })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<String> {
    return this.secretNoteService.remove(id);
  }

  @ApiOperation({ summary: 'Update a secret note by ID' })
  @ApiResponse({ status: 200, type: SecretNotes })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNotes> {
    return this.secretNoteService.update(id, updateSecretNoteDto);
  }
}
