import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { FriendshipsModule } from './modules/friendships/friendships.module';
import { MessagesModule } from './modules/chatmessages/messages.module';
import { ChatModule } from './modules/chat/chat.module';

import { envConfig } from './config/env.config';
import { getTypeOrmConfig } from './config/database.config';

@Module({
  imports: [
    // Configuração de ambiente
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),

    // Configuração do banco de dados
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),

    // Módulos da aplicação
    UsersModule,
    AuthModule,
    ProfilesModule,
    FriendshipsModule,
    MessagesModule,
    ChatModule,
  ],
})
export class AppModule {}
