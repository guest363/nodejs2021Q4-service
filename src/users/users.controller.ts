import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserSetT } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.usersService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() board: UserSetT) {
    return await this.usersService.create(board);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.usersService.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() board: UserSetT) {
    return await this.usersService.update(id, board);
  }
}
