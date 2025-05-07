import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friendship, FriendshipStatus } from './entities/friendship.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FriendshipsService {
  constructor(
    @InjectRepository(Friendship)
    private repo: Repository<Friendship>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async sendRequest(fromUserId: string, toUserId: string) {
    if (fromUserId === toUserId) {
      throw new BadRequestException('Não é possível enviar amizade a si mesmo');
    }

    const existing = await this.repo.findOne({
      where: [
        { requester: { id: fromUserId }, receiver: { id: toUserId } },
        { requester: { id: toUserId }, receiver: { id: fromUserId } },
      ],
    });

    if (existing) {
      throw new BadRequestException(
        'Solicitação já existente ou amizade pendente',
      );
    }

    const requester = await this.userRepo.findOneByOrFail({ id: fromUserId });
    const receiver = await this.userRepo.findOneByOrFail({ id: toUserId });

    const friendship = this.repo.create({
      requester,
      receiver,
      status: FriendshipStatus.PENDING,
    });

    return this.repo.save(friendship);
  }

  async updateStatus(
    currentUserId: string,
    otherUserId: string,
    status: FriendshipStatus,
  ) {
    const friendship = await this.repo.findOne({
      where: [
        { requester: { id: otherUserId }, receiver: { id: currentUserId } },
      ],
    });

    if (!friendship) {
      throw new NotFoundException('Solicitação de amizade não encontrada');
    }

    friendship.status = status;
    return this.repo.save(friendship);
  }

  async removeFriendship(userId: string, otherUserId: string) {
    const friendship = await this.repo.findOne({
      where: [
        { requester: { id: userId }, receiver: { id: otherUserId } },
        { requester: { id: otherUserId }, receiver: { id: userId } },
      ],
    });

    if (!friendship) {
      throw new NotFoundException('Amizade não encontrada');
    }

    return this.repo.remove(friendship);
  }

  async listFriends(userId: string) {
    const friendships = await this.repo.find({
      where: [
        { requester: { id: userId }, status: FriendshipStatus.ACCEPTED },
        { receiver: { id: userId }, status: FriendshipStatus.ACCEPTED },
      ],
      relations: ['requester', 'receiver'],
    });

    return friendships.map((f) =>
      f.requester.id === userId ? f.receiver : f.requester,
    );
  }

  getPendingFriendRequests(userId: string) {
    return this.repo.find({
      where: {
        receiver: { id: userId },
        status: FriendshipStatus.PENDING,
      },
      relations: ['requester'],
      order: { createdAt: 'DESC' },
    });
  }
}
