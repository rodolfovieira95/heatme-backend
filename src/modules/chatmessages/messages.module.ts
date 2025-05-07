import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Friendship } from '../friendships/entities/friendship.entity';
import { MessagesGateway } from 'src/messages.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, Friendship])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
})
export class MessagesModule {}
