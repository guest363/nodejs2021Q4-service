import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config = {
  PORT: parseInt(String(process.env.PORT), 10),
  NODE_ENV: process.env.NODE_ENV || 'production',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL: parseInt(String(process.env.LOG_LEVEL), 10) || 4,
  POSTGRES_DB: process.env.POSTGRES_DB || 'test',
  POSTGRES_USER: process.env.POSTGRES_USER || 'test',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'test',
  PGPORT: Number(process.env.PGPORT),
  POSTGRES_HOST: String(process.env.POSTGRES_HOST),
};
