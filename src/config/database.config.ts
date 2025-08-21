import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: 'localhost',
  port: process.env.DB_PORT,
  type: process.env.DB_TYPE,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  autoLoadEntities: true,
}));
