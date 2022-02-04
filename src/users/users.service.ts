import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entitys/user';
import { User } from './models/user.model';
import { UserSetT } from './types';

@Injectable()
export class UsersService {
  async getAll() {
    const result = await getRepository(UserEntity).find();
    return result;
  }

  async create(info: UserSetT) {
    const user = new User(info);
    await getRepository(UserEntity).save(user);
    return user as UserEntity;
  }

  async getById(id: string) {
    const result = await getRepository(UserEntity).findOne(id);

    return result;
  }

  async delete(id: string) {
    const result = await getRepository(UserEntity).delete(id);

    return result.affected !== 0;
  }

  async update(id: string, user: UserSetT) {
    await getRepository(UserEntity).update(id, user);

    return { id, ...user } as UserEntity;
  }

  async findOne(username: string): Promise<User | undefined> {
    return await getRepository(UserEntity).findOne({ name: username });
  }
}
