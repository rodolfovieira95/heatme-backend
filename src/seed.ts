import * as bcrypt from 'bcrypt';
import dataSource from '../data-source';
import { User } from './modules/users/entities/user.entity';
import { UserProfile } from './modules/profiles/entities/user-profile.entity';
import {
  Friendship,
  FriendshipStatus,
} from './modules/friendships/entities/friendship.entity';
import { ChatMessage } from './modules/chatmessages/entities/chat-message.entity';

async function seed() {
  await dataSource.initialize();

  try {
    // Criar usuários
    const user1 = await dataSource.getRepository(User).save({
      email: 'usuario1@exemplo.com',
      password: await bcrypt.hash('senha123', 10),
      username: 'usuario1',
    });

    const user2 = await dataSource.getRepository(User).save({
      email: 'usuario2@exemplo.com',
      password: await bcrypt.hash('senha123', 10),
      username: 'usuario2',
    });

    const user3 = await dataSource.getRepository(User).save({
      email: 'usuario3@exemplo.com',
      password: await bcrypt.hash('senha123', 10),
      username: 'usuario3',
    });

    // Criar perfis
    await dataSource.getRepository(UserProfile).save([
      {
        userId: user1.id,
        name: 'João Silva',
        bio: 'Desenvolvedor apaixonado por tecnologia',
        avatar: 'https://exemplo.com/avatar1.jpg',
      },
      {
        userId: user2.id,
        name: 'Maria Santos',
        bio: 'Designer criativa e amante de arte',
        avatar: 'https://exemplo.com/avatar2.jpg',
      },
      {
        userId: user3.id,
        name: 'Pedro Oliveira',
        bio: 'Músico e entusiasta de jogos',
        avatar: 'https://exemplo.com/avatar3.jpg',
      },
    ]);

    // Criar amizades
    await dataSource.getRepository(Friendship).save([
      {
        requester: user1,
        receiver: user2,
        status: FriendshipStatus.ACCEPTED,
      },
      {
        requester: user1,
        receiver: user3,
        status: FriendshipStatus.PENDING,
      },
      {
        requester: user2,
        receiver: user3,
        status: FriendshipStatus.ACCEPTED,
      },
    ]);

    // Criar mensagens de chat
    await dataSource.getRepository(ChatMessage).save([
      {
        senderId: user1.id,
        receiverId: user2.id,
        content: 'Olá! Como vai?',
        timestamp: new Date(),
      },
      {
        senderId: user2.id,
        receiverId: user1.id,
        content: 'Oi! Tudo bem, e você?',
        timestamp: new Date(),
      },
      {
        senderId: user2.id,
        receiverId: user3.id,
        content: 'Vamos jogar algo hoje?',
        timestamp: new Date(),
      },
    ]);

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
