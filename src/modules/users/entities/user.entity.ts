import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SocialProviderEnum, UserRole } from '../interfaces';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ default: false })
  isAnonymous: boolean;

  @Column({ default: false })
  isPremium: boolean;

  @Column({
    type: 'enum',
    enum: SocialProviderEnum,
    nullable: true,
  })
  socialProvider: SocialProviderEnum | null;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
