import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from './constants/envs';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { UserProfile } from './modules/profiles/entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [User, UserProfile],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ProfilesModule,
  ],
  providers: [ChatGateway, ChatService],
})
export class AppModule {}
