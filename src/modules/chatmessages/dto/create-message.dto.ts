import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Id do usuário receptor da mensagem',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'toUserId deve ser um UUID válido' })
  @IsNotEmpty({ message: 'toUserId é obrigatório' })
  toUserId: string;

  @ApiProperty({
    description: 'Conteúdo da mensagem',
    example: 'Olá, tudo bem?',
  })
  @IsString({ message: 'content deve ser uma string' })
  @IsNotEmpty({ message: 'content é obrigatório' })
  content: string;
}
