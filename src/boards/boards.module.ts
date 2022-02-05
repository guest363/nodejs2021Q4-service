import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './../entitys/board';
import { BoardsController } from './boards.controller';
import { BoardService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardService],
  controllers: [BoardsController],
})
export class BoardsModule {}
