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

  @ApiOperation({ summary: 'Listar amigos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de amigos retornada com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get()
  listFriends(@CurrentUser() user: { userId: string }) {
    return this.service.listFriends(user.userId);
  }

  @ApiOperation({ summary: 'Listar solicitações pendentes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de solicitações pendentes retornada com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get('pending')
  getPending(@CurrentUser() user: User) {
    return this.service.getPendingFriendRequests(user.id);
  }

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
  sendRequest(
    @CurrentUser() user: { userId: string },
    @Param('userId') toUserId: string,
  ) {
    return this.service.sendRequest(user.userId, toUserId);
  }

  @ApiOperation({ summary: 'Atualizar status da solicitação de amizade' })
  @ApiParam({
    name: 'id',
    description: 'ID da solicitação de amizade',
  })
  @ApiResponse({
    status: 200,
    description: 'Status da solicitação atualizado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Solicitação não encontrada' })
  @Patch('requests/:id')
  updateRequestStatus(
    @CurrentUser() user: User,
    @Param('id') friendshipId: string,
    @Body() dto: UpdateFriendshipStatusDto,
  ) {
    return this.service.updateFriendshipStatus(
      friendshipId,
      user.id,
      dto.status,
    );
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

  @ApiOperation({ summary: 'Buscar informações de um amigo específico' })
  @ApiParam({ name: 'userId', description: 'ID do amigo' })
  @ApiResponse({
    status: 200,
    description: 'Informações do amigo retornadas com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Amigo não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @Get(':userId')
  getFriend(@CurrentUser() user: User, @Param('userId') friendId: string) {
    return this.service.getFriend(user.id, friendId);
  }
}
