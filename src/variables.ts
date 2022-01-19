import path from 'path';
import typeorm from 'typeorm';
import { config } from './common/config';
import { User } from './resources/users/user.model';

const { createConnection } = typeorm;
export const __dirname = path.resolve(path.dirname(''));
// Initialize a connection pool against the database.
export const connection = await createConnection({
  type: 'postgres',
  host: 'localhost',
  port: config.PGPORT,
  username: config.PGUSER,
  password: config.PGPASSWORD,
  database: config.PGDATABASE,
  entities: [User],
});
