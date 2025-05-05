import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepo: Repository<UserProfile>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createOrUpdate(
    jwtPayload: { userId: string },
    dto: CreateUserProfileDto | UpdateUserProfileDto,
  ) {
    const updateData = Object.fromEntries(
      Object.entries(dto).filter(([, v]) => v !== undefined && v !== null),
    );

    const user = await this.userRepo.findOne({
      where: { id: jwtPayload.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existing = await this.profileRepo.findOne({
      where: { user: { id: user.id } },
    });

    if (existing) {
      Object.assign(existing, updateData);
      return this.profileRepo.save(existing);
    }

    const profile = this.profileRepo.create({
      ...updateData,
      user,
    });

    return this.profileRepo.save(profile);
  }

  async findByUser(user: User) {
    const profile = await this.profileRepo.findOne({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
    if (!profile) throw new NotFoundException('Perfil não encontrado');
    return profile;
  }
}
