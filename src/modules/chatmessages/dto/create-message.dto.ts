import { IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Id do usuário receptor da mensagem',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  toUserId: string;

  @ApiProperty({
    description: 'Conteúdo da mensagem',
    example: 'Olá, tudo bem?',
  })
  @IsString()
  content: string;
}
