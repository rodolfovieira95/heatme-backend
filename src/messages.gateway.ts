import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './modules/chatmessages/dto/create-message.dto';
import { MessagesService } from './modules/chatmessages/messages.service';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private users = new Map<string, string>(); // userId -> socketId

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(socket: Socket) {
    const userId = socket.handshake.query.userId as string;
    if (userId) {
      this.users.set(userId, socket.id);
      console.log(`🔌 ${userId} conectado (${socket.id})`);
    }
  }

  handleDisconnect(socket: Socket) {
    const disconnectedUser = [...this.users.entries()].find(
      ([, id]) => id === socket.id,
    );
    if (disconnectedUser) {
      this.users.delete(disconnectedUser[0]);
      console.log(`❌ ${disconnectedUser[0]} desconectado`);
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: CreateMessageDto & { fromUserId: string },
  ) {
    const saved = await this.messagesService.sendMessage(
      payload.fromUserId,
      payload,
    );

    const toSocketId = this.users.get(payload.toUserId);
    if (toSocketId) {
      this.server.to(toSocketId).emit('receive_message', saved);
    }

    return saved;
  }
}
