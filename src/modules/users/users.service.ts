import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './interfaces';
import { UserProfile } from '../profiles/entities/user-profile.entity';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserProfile)
    private profileRepo: Repository<UserProfile>,
    @Inject(forwardRef(() => ProfilesService))
    private readonly profilesService: ProfilesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create({
      ...createUserDto,
      role: createUserDto.role || UserRole.USER,
    });
    const savedUser = await this.userRepo.save(user);

    // Criar um perfil vazio para o novo usuário
    await this.profilesService.createOrUpdate({ userId: savedUser.id }, {});

    return savedUser;
  }

  findAll() {
    return this.userRepo.find();
  }

  async searchUsers(query: string) {
    if (!query) return [];

    return this.userRepo.find({
      where: [
        { username: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
      ],
      select: {
        id: true,
        username: true,
        email: true,
        isAnonymous: true,
        isPremium: true,
        socialProvider: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      take: 10,
    });
  }

  findOne(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepo.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'password',
        'username',
        'isAnonymous',
        'isPremium',
        'socialProvider',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload({
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) return null;
    return this.userRepo.remove(user);
  }

  async createUserWithProfile(dto: CreateUserDto) {
    const user = await this.userRepo.save(this.userRepo.create(dto));
    const profile = await this.profileRepo.save(
      this.profileRepo.create({ user }),
    );
    return { ...user, profile };
  }

  async getUserWithProfile(id: string) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['profile'],
    });
  }
}
