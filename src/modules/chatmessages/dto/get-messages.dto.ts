import { IsUUID } from 'class-validator';

export class GetMessagesDto {
  @IsUUID()
  friendId: string;
}
