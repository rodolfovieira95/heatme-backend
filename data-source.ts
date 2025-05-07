import { DataSource } from 'typeorm';
import { User } from './src/modules/users/entities/user.entity';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/constants/envs';
import { UserProfile } from 'src/modules/profiles/entities/user-profile.entity';
import { Friendship } from 'src/modules/friendships/entities/friendship.entity';
import { ChatMessage } from 'src/modules/chatmessages/entities/chat-message.entity';

export default new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, UserProfile, Friendship, ChatMessage],
  migrations: ['src/migrations/*.ts'],
});
