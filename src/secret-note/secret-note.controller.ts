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
import { SecretNote } from './secret-note.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Secret Notes')
@Controller('secretnotes')
export class SecretNoteController {
  constructor(private readonly secretNoteService: SecretNoteService) {}

  @ApiOperation({ summary: 'Create a new secret note' })
  @ApiResponse({ status: 201, type: SecretNote })
  @Post()
  async create(
    @Body() createSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNote> {
    return this.secretNoteService.create(createSecretNoteDto);
  }

  @ApiOperation({ summary: 'Get all secret note' })
  @ApiResponse({ status: 200, type: [SecretNote] })
  @Get()
  async findAll(): Promise<SecretNote[]> {
    return this.secretNoteService.findAll();
  }

  @ApiOperation({ summary: 'Get a secret note by ID' })
  @ApiResponse({ status: 200, type: SecretNote })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SecretNote> {
    return this.secretNoteService.findOne(id);
  }

  @ApiOperation({ summary: 'Get a encrypted secret note by ID' })
  @ApiResponse({ status: 200, type: SecretNote })
  @Get(':id/encrypted')
  async findOneEncrypted(@Param('id') id: number): Promise<SecretNote> {
    return this.secretNoteService.findOneEncrypted(id);
  }

  @ApiOperation({ summary: 'Delete a secret note by ID' })
  @ApiResponse({ status: 200, type: SecretNote })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.secretNoteService.remove(id);
  }

  @ApiOperation({ summary: 'Update a secret note by ID' })
  @ApiResponse({ status: 200, type: SecretNote })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSecretNoteDto: CreateSecretNoteDto,
  ): Promise<SecretNote> {
    return this.secretNoteService.update(id, updateSecretNoteDto);
  }
}
