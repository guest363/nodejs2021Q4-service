import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserGetT, UserSetT } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() board: UserSetT): Promise<UserGetT> {
    return await this.usersService.create(board);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() board: UserSetT
  ) {
    return await this.usersService.update(id, board);
  }
}
