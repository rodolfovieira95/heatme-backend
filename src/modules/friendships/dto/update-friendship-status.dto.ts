import { IsEnum } from 'class-validator';
import { FriendshipStatus } from '../entities/friendship.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFriendshipStatusDto {
  @ApiProperty({
    enum: FriendshipStatus,
    description: 'Status da amizade',
    example: FriendshipStatus.ACCEPTED,
    enumName: 'FriendshipStatus',
  })
  @IsEnum(FriendshipStatus)
  status: FriendshipStatus;
}
