import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  BodyHairEnum,
  EyeColorEnum,
  HairColorEnum,
  RelationshipStatusEnum,
  SexualPreferenceEnum,
  SkinColorEnum,
  SocialProviderEnum,
  TribeEnum,
} from '../interfaces';

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

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  weight: number;

  @Column({
    type: 'enum',
    enum: BodyHairEnum,
    nullable: true,
  })
  bodyHair: BodyHairEnum;

  @Column({
    type: 'enum',
    enum: SkinColorEnum,
    nullable: true,
  })
  skinColor: SkinColorEnum;

  @Column({
    type: 'enum',
    enum: HairColorEnum,
    nullable: true,
  })
  hairColor: HairColorEnum;

  @Column({
    type: 'enum',
    enum: EyeColorEnum,
    nullable: true,
  })
  eyeColor: EyeColorEnum;

  @Column({
    type: 'enum',
    enum: SexualPreferenceEnum,
    nullable: true,
  })
  preferredPosition: SexualPreferenceEnum;

  @Column('enum', {
    enum: TribeEnum,
    array: true,
    nullable: true,
  })
  tribe: TribeEnum[];

  @Column({
    type: 'enum',
    enum: RelationshipStatusEnum,
    nullable: true,
  })
  relationshipStatus: RelationshipStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
