import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { UserProfile } from '../profiles/entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    forwardRef(() => ProfilesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
