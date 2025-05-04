import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FriendshipsService } from './friendships.service';
import { User } from '../users/entities/user.entity';
import { UpdateFriendshipStatusDto } from './dto/update-friendship-status.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Amizades')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendshipsController {
  constructor(private readonly service: FriendshipsService) {}

  @ApiOperation({ summary: 'Enviar solicitação de amizade' })
  @ApiParam({
    name: 'userId',
    description: 'ID do usuário que receberá a solicitação',
  })
  @ApiResponse({
    status: 201,
    description: 'Solicitação de amizade enviada com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Post(':userId')
  sendRequest(@CurrentUser() user: User, @Param('userId') toUserId: string) {
    return this.service.sendRequest(user.id, toUserId);
  }

  @ApiOperation({ summary: 'Atualizar status da amizade' })
  @ApiParam({ name: 'userId', description: 'ID do usuário da amizade' })
  @ApiResponse({
    status: 200,
    description: 'Status da amizade atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Patch(':userId')
  updateStatus(
    @CurrentUser() user: User,
    @Param('userId') otherUserId: string,
    @Body() dto: UpdateFriendshipStatusDto,
  ) {
    return this.service.updateStatus(user.id, otherUserId, dto.status);
  }

  @ApiOperation({ summary: 'Remover amizade' })
  @ApiParam({ name: 'userId', description: 'ID do usuário da amizade' })
  @ApiResponse({ status: 200, description: 'Amizade removida com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Delete(':userId')
  removeFriend(
    @CurrentUser() user: User,
    @Param('userId') otherUserId: string,
  ) {
    return this.service.removeFriendship(user.id, otherUserId);
  }

  @ApiOperation({ summary: 'Listar amigos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de amigos retornada com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get()
  listFriends(@CurrentUser() user: User) {
    return this.service.listFriends(user.id);
  }
}
