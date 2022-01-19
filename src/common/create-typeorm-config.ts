import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(__dirname, '.env'),
});

const getTypeormConfig = () => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: process.env.PGPORT,
    username: process.env.PGUSER || 'test',
    password: process.env.PGPASSWORD || 'test',
    database: process.env.PGPASSWORD || 'test',
    entities: ['build/entity/*.js'],
    synchronize: true,
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
  };
};

fs.writeFileSync('ormconfig.json', JSON.stringify(getTypeormConfig(), null, 2));
