import { Controller, Get, Post, Patch, Body, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  getProfile(@CurrentUser() user: User) {
    return this.profilesService.findByUser(user);
  }

  @Post()
  create(
    @CurrentUser() userPayload: { userId: string },
    @Body() dto: CreateUserProfileDto,
  ) {
    return this.profilesService.createOrUpdate(userPayload, dto);
  }

  @Patch()
  update(
    @CurrentUser() userPayload: { userId: string },
    @Body() dto: UpdateUserProfileDto,
  ) {
    return this.profilesService.createOrUpdate(userPayload, dto);
  }
}
