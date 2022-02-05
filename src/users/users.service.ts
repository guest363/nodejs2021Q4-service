import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { hash } from '../auth/hash';
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
    await getRepository(UserEntity).save(user);
    return user as unknown as UserEntity;
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

  async findOne(username: string): Promise<UserEntity | undefined> {
    return await getRepository(UserEntity).findOne({ name: username });
  }

  async onModuleInit() {
    const createAdmin = new User({
      password: await hash(String('admin')),
      login: 'admin',
      name: 'admin',
    });
    console.log(createAdmin);
    
  /*   try {
      const adminFind = await getRepository(UserEntity).findOne({
        login: 'admin',
        name: 'admin',
      });
      console.log(adminFind);

      if (!adminFind) {
        await getRepository(UserEntity).save(createAdmin);
      }
    } catch (error) {
      Logger.error(error);
    } */
  }
}
