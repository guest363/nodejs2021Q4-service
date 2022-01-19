import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

const __dirname = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(__dirname, '.env'),
});

export const getTypeormConfig = (): ConnectionOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.PGPORT),
    username: process.env.POSTGRES_USER || 'test',
    password: process.env.POSTGRES_PASSWORD || 'test',
    database: process.env.POSTGRES_DB || 'test',
    entities: ['./src/entity/*{.ts,.js}'],
    synchronize: true,
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
  };
};

fs.writeFileSync('ormconfig.json', JSON.stringify(getTypeormConfig(), null, 2));
