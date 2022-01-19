import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.PGPORT),
  username: process.env.POSTGRES_USER || 'test',
  password: process.env.POSTGRES_PASSWORD || 'test',
  database: process.env.POSTGRES_DB || 'test',
  entities: ['build/entity/*{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
  synchronize: true,
} as ConnectionOptions;
