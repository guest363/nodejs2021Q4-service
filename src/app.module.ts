import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsController } from './boards/boards.controller';
import { BoardService } from './boards/boards.service';

@Module({
  imports: [],
  controllers: [AppController, BoardsController],
  providers: [AppService, BoardService],
})
export class AppModule {}
