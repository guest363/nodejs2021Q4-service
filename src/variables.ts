import path from 'path';
import { createConnection } from 'typeorm';
import { config } from './common/config';
import { User } from './resources/users/user.model';

export const __dirname = path.resolve(path.dirname(''));
// Initialize a connection pool against the database.
export const connection = await createConnection({
  type: 'postgres',
  host: 'localhost',
  port: config.DB_PORT,
  username: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_DATABASE,
  entities: [User],
});
