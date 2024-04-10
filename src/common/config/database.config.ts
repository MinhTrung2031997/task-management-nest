import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.POSTGRES_TYPE,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
}));
