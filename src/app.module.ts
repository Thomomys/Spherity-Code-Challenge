import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretNoteModule } from './secret-note/secret-note.module';
import { DatabaseModule } from './shared/database.module';

@Module({
  imports: [SecretNoteModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
