import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(
    @CurrentUser() user: { userId: string; role: string },
    @Body() dto: CreateMessageDto,
  ) {
    const result = await this.messagesService.sendMessage(user.userId, dto);
    return result;
  }

  @Get('recent')
  async getRecentMessages(@CurrentUser() user: User) {
    return this.messagesService.getRecentMessages(user.id);
  }

  @Get(':friendId')
  async getMessages(
    @CurrentUser() user: User,
    @Param() params: GetMessagesDto,
  ) {
    return this.messagesService.getMessages(user.id, params.friendId);
  }
}
