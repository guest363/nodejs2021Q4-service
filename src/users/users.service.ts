import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entitys/user';
import { User } from './models/user.model';
import { UserSetT } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async getAll() {
    const result = await this.usersRepository.find();
    return result;
  }

  async create(info: UserSetT) {
    const user = new User(info);
    await await this.usersRepository.save(user);
    return user as unknown as UserEntity;
  }

  async getById(id: string) {
    const result = await await this.usersRepository.findOne(id);

    return result;
  }

  async delete(id: string) {
    const result = await await this.usersRepository.delete(id);

    return result.affected !== 0;
  }

  async update(id: string, user: UserSetT) {
    await await this.usersRepository.update(id, user);

    return { id, ...user } as UserEntity;
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return await await this.usersRepository.findOne({ name: username });
  }

  async onModuleInit() {
    const createAdmin = new User({
      password: 'admin',
      login: 'admin',
      name: 'admin',
    });

    try {
      const adminFind = await await this.usersRepository.findOne({
        login: 'admin',
        name: 'admin',
      });

      if (!adminFind) {
        await await this.usersRepository.save(createAdmin);
      }
    } catch (error) {
      Logger.error(error);
    }
  }
}
