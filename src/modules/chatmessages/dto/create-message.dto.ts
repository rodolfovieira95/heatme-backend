import { IsUUID, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  toUserId: string;

  @IsString()
  content: string;
}
