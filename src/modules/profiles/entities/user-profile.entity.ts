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

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  displayName: string;

  @Column({ type: 'varchar', nullable: true })
  gender: GenderEnum;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

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
}
