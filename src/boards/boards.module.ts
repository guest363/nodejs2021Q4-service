import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardService } from './boards.service';

@Module({ providers: [BoardService], controllers: [BoardsController] })
export class BoardsModule {}
