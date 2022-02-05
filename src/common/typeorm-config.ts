import { ConnectionOptions } from 'typeorm';
import { BoardEntity } from '../entitys/board';
import { ColumnsEntity } from '../entitys/column';
import { TaskEntity } from '../entitys/task';
import { UserEntity } from '../entitys/user';
import { config } from './config';

export default {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: Number(config.PGPORT),
  username: config.POSTGRES_USER || 'test',
  password: config.POSTGRES_PASSWORD || 'test',
  database: config.POSTGRES_DB || 'test',
  entities: [UserEntity, ColumnsEntity, TaskEntity, BoardEntity],
  migrationsTableName: 'migration',
  migrations: ['build/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
  synchronize: false,
  migrationsRun: true,
} as ConnectionOptions;
