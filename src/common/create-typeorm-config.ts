import fs from 'fs';

const getTypeormConfig = () => {
  return {
    type: 'postgres',

    host: 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.PG_USER || 'test',
    password: process.env.PG_PASSWORD || 'test',
    database: process.env.PG_PASSWORD || 'test',

    entities: ['**/*.model{.ts,.js}'],

    migrationsTableName: 'migration',

    migrations: ['src/migration/*.ts'],

    cli: {
      migrationsDir: 'src/migration',
    },
  };
};

fs.writeFileSync('ormconfig.json', JSON.stringify(getTypeormConfig(), null, 2));
