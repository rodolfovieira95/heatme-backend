import { DataSource } from 'typeorm';
import { User } from './src/modules/users/entities/user.entity';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/constants/envs';

export default new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});
