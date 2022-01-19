import { ConnectionOptions } from 'typeorm';
import { BoardEntity } from './../entitys/board';
import { ColumnsEntity } from './../entitys/column';
import { TaskEntity } from './../entitys/task';
import { UserEntity } from './../entitys/user';

export default {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.PGPORT),
  username: process.env.POSTGRES_USER || 'test',
  password: process.env.POSTGRES_PASSWORD || 'test',
  database: process.env.POSTGRES_DB || 'test',
  entities: [UserEntity, ColumnsEntity, TaskEntity, BoardEntity],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
  synchronize: true,
} as ConnectionOptions;
