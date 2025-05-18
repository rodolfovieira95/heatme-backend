import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import {
  BodyHairEnum,
  EyeColorEnum,
  GenderEnum,
  HairColorEnum,
  RelationshipStatusEnum,
  SexualPreferenceEnum,
  SkinColorEnum,
  TribeEnum,
} from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_profiles')
export class UserProfile {
  @ApiProperty({
    description: 'ID único do perfil',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => User })
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @ApiProperty({
    description: 'URL do avatar do usuário',
    example: 'https://example.com/avatar.jpg',
    nullable: true,
  })
  @Column({ nullable: true })
  avatarUrl: string;

  @ApiProperty({
    description: 'Nome de exibição do usuário',
    example: 'João Silva',
    nullable: true,
  })
  @Column({ nullable: true })
  displayName: string;

  @ApiProperty({
    description: 'Gênero do usuário',
    enum: GenderEnum,
    example: GenderEnum.MALE,
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  gender: GenderEnum;

  @ApiProperty({
    description: 'País do usuário',
    example: 'Brasil',
    nullable: true,
  })
  @Column({ nullable: true })
  country: string;

  @ApiProperty({
    description: 'Cidade do usuário',
    example: 'São Paulo',
    nullable: true,
  })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({
    description: 'Biografia do usuário',
    example: 'Olá, sou um desenvolvedor apaixonado por tecnologia!',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty({
    description: 'Tags associadas ao perfil',
    example: ['tecnologia', 'programação', 'música'],
    type: [String],
    default: [],
  })
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @ApiProperty({
    description: 'Idade do usuário',
    example: 25,
    nullable: true,
  })
  @Column({ nullable: true })
  age: number;

  @ApiProperty({
    description: 'Altura do usuário em centímetros',
    example: 180,
    nullable: true,
  })
  @Column({ nullable: true })
  height: number;

  @ApiProperty({
    description: 'Peso do usuário em quilogramas',
    example: 75,
    nullable: true,
  })
  @Column({ nullable: true })
  weight: number;

  @ApiProperty({
    description: 'Pelos corporais',
    enum: BodyHairEnum,
    example: BodyHairEnum.SMOOTH,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: BodyHairEnum,
    nullable: true,
  })
  bodyHair: BodyHairEnum;

  @ApiProperty({
    description: 'Cor da pele',
    enum: SkinColorEnum,
    example: SkinColorEnum.TYPE_1,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: SkinColorEnum,
    nullable: true,
  })
  skinColor: SkinColorEnum;

  @ApiProperty({
    description: 'Cor do cabelo',
    enum: HairColorEnum,
    example: HairColorEnum.BLONDE,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: HairColorEnum,
    nullable: true,
  })
  hairColor: HairColorEnum;

  @ApiProperty({
    description: 'Cor dos olhos',
    enum: EyeColorEnum,
    example: EyeColorEnum.LIGHT_BROWN,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: EyeColorEnum,
    nullable: true,
  })
  eyeColor: EyeColorEnum;

  @ApiProperty({
    description: 'Posição sexual preferida',
    enum: SexualPreferenceEnum,
    example: SexualPreferenceEnum.VERSATILE,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: SexualPreferenceEnum,
    nullable: true,
  })
  preferredPosition: SexualPreferenceEnum;

  @ApiProperty({
    description: 'Tribos associadas ao usuário',
    enum: TribeEnum,
    example: [TribeEnum.CUB, TribeEnum.CHUBBY],
    isArray: true,
    nullable: true,
  })
  @Column('enum', {
    enum: TribeEnum,
    array: true,
    nullable: true,
  })
  tribe: TribeEnum[];

  @ApiProperty({
    description: 'Status de relacionamento',
    enum: RelationshipStatusEnum,
    example: RelationshipStatusEnum.SINGLE,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: RelationshipStatusEnum,
    nullable: true,
  })
  relationshipStatus: RelationshipStatusEnum;
}
