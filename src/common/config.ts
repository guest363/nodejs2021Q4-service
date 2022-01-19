import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(__dirname, '.env'),
});

export const config = {
  PORT: parseInt(String(process.env.PORT), 10) || 4000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL: parseInt(String(process.env.LOG_LEVEL), 10) || 4,
  PGDATABASE: process.env.PGDATABASE || 'test',
  PGUSER: process.env.PGUSER || 'test',
  PGPASSWORD: process.env.PGPASSWORD || 'test',
  PGPORT: Number(process.env.PGPORT),
};
