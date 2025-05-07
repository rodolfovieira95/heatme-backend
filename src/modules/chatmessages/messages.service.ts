import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  Friendship,
  FriendshipStatus,
} from '../friendships/entities/friendship.entity';
import { RecentMessage } from './interfaces';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly messageRepo: Repository<ChatMessage>,

    @InjectRepository(Friendship)
    private readonly friendshipRepo: Repository<Friendship>,
  ) {}

  async sendMessage(fromUserId: string, dto: CreateMessageDto) {
    const isFriend = await this.friendshipRepo.findOne({
      where: [
        {
          requester: { id: fromUserId },
          receiver: { id: dto.toUserId },
          status: FriendshipStatus.ACCEPTED,
        },
        {
          requester: { id: dto.toUserId },
          receiver: { id: fromUserId },
          status: FriendshipStatus.ACCEPTED,
        },
      ],
    });

    if (!isFriend) {
      throw new ForbiddenException('Usuários não são amigos.');
    }

    const message = this.messageRepo.create({
      fromUser: { id: fromUserId },
      toUser: { id: dto.toUserId },
      content: dto.content,
    });

    return this.messageRepo.save(message);
  }

  async getMessages(userId: string, friendId: string) {
    const isFriend = await this.friendshipRepo.findOne({
      where: [
        {
          requester: { id: userId },
          receiver: { id: friendId },
          status: FriendshipStatus.ACCEPTED,
        },
        {
          requester: { id: friendId },
          receiver: { id: userId },
          status: FriendshipStatus.ACCEPTED,
        },
      ],
    });

    if (!isFriend) {
      throw new ForbiddenException('Usuários não são amigos.');
    }

    return this.messageRepo.find({
      where: [
        { fromUser: { id: userId }, toUser: { id: friendId } },
        { fromUser: { id: friendId }, toUser: { id: userId } },
      ],
      order: { timestamp: 'ASC' },
    });
  }

  async getRecentMessages(userId: string) {
    const rawMessages = await this.messageRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.fromUser', 'fromUser')
      .leftJoinAndSelect('message.toUser', 'toUser')
      .where('fromUser.id = :userId OR toUser.id = :userId', { userId })
      .orderBy('message.timestamp', 'DESC')
      .getMany();

    const seen = new Set();
    const recent: RecentMessage[] = [];

    for (const msg of rawMessages) {
      const otherUser = msg.fromUser.id === userId ? msg.toUser : msg.fromUser;

      if (!seen.has(otherUser.id)) {
        seen.add(otherUser.id);
        recent.push({
          userId: otherUser.id,
          username: otherUser.username,
          avatarUrl: otherUser.avatarUrl,
          lastMessage: msg.content,
          timestamp: msg.timestamp,
        });
      }
    }

    return recent;
  }
}
