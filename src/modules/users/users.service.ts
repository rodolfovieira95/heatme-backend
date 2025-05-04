import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repo.preload({
      id,
      ...updateUserDto,
    });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) return null;
    return this.repo.remove(user);
  }
}
