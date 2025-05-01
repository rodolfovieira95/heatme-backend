import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private waitingQueue: Socket[] = [];
  private roomMap: Map<string, string> = new Map(); // socket.id => room

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`🔌 Cliente conectado: ${client.id}`);
    this.waitingQueue.push(client);
    this.tryPairing();
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Cliente desconectado: ${client.id}`);
    this.removeFromQueue(client);
    const room = this.roomMap.get(client.id);
    if (room) {
      client.to(room).emit('partner-left');
      this.roomMap.delete(client.id);
      [...this.roomMap.entries()].forEach(([id, r]) => {
        if (r === room) this.roomMap.delete(id);
      });
    }
  }

  @SubscribeMessage('offer')
  handleOffer(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const room = this.roomMap.get(client.id);
    if (room) {
      client.to(room).emit('offer', data);
    }
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const room = this.roomMap.get(client.id);
    if (room) {
      client.to(room).emit('answer', data);
    }
  }

  @SubscribeMessage('ice-candidate')
  handleCandidate(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const room = this.roomMap.get(client.id);
    if (room) {
      client.to(room).emit('ice-candidate', data);
    }
  }

  @SubscribeMessage('leave-room')
  handleLeave(@ConnectedSocket() client: Socket) {
    const room = this.roomMap.get(client.id);
    if (room) {
      client.leave(room);
      client.to(room).emit('partner-left');
      this.roomMap.delete(client.id);
      [...this.roomMap.entries()].forEach(([id, r]) => {
        if (r === room) this.roomMap.delete(id);
      });
    }
    this.waitingQueue.push(client);
    this.tryPairing();
  }

  @SubscribeMessage('chat-message')
  handleChatMessage(
    @MessageBody() data: { message: string; room: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('📥 Mensagem recebida do cliente', client.id, ':', data);

    const { room, message } = data;
    if (!room || !message) {
      console.warn('❌ Dados inválidos:', data);
      return;
    }

    this.server.to(room).emit('chat-message', {
      from: client.id,
      message,
    });
  }

  private tryPairing() {
    while (this.waitingQueue.length >= 2) {
      const socket1 = this.waitingQueue.shift();
      const socket2 = this.waitingQueue.shift();
      if (socket1 && socket2) {
        const room = `room-${socket1.id}-${socket2.id}`;
        socket1.join(room);
        socket2.join(room);
        this.roomMap.set(socket1.id, room);
        this.roomMap.set(socket2.id, room);

        socket1.emit('paired', { room, initiator: true });
        socket2.emit('paired', { room, initiator: false });

        console.log(`✅ Pareados na sala ${room}`);
      }
    }
  }

  private removeFromQueue(client: Socket) {
    this.waitingQueue = this.waitingQueue.filter((s) => s.id !== client.id);
  }
}
