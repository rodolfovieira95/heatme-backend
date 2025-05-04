import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
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

export class CreateUserProfileDto {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Idade do usuário',
    example: 25,
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({
    description: 'Altura do usuário em centímetros',
    example: 180,
  })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiPropertyOptional({
    description: 'Peso do usuário em quilogramas',
    example: 75,
  })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({
    description: 'Pelos corporais',
    enum: BodyHairEnum,
    example: BodyHairEnum.SMOOTH,
  })
  @IsOptional()
  @IsEnum(BodyHairEnum)
  bodyHair?: BodyHairEnum;

  @ApiPropertyOptional({
    description: 'Cor da pele',
    enum: SkinColorEnum,
    example: SkinColorEnum.TYPE_1,
  })
  @IsOptional()
  @IsEnum(SkinColorEnum)
  skinColor?: SkinColorEnum;

  @ApiPropertyOptional({
    description: 'Cor do cabelo',
    enum: HairColorEnum,
    example: HairColorEnum.BLONDE,
  })
  @IsOptional()
  @IsEnum(HairColorEnum)
  hairColor?: HairColorEnum;

  @ApiPropertyOptional({
    description: 'Cor dos olhos',
    enum: EyeColorEnum,
    example: EyeColorEnum.LIGHT_BLUE,
  })
  @IsOptional()
  @IsEnum(EyeColorEnum)
  eyeColor?: EyeColorEnum;

  @ApiPropertyOptional({
    description: 'Posição preferida',
    enum: SexualPreferenceEnum,
    example: SexualPreferenceEnum.VERSATILE,
  })
  @IsOptional()
  @IsEnum(SexualPreferenceEnum)
  preferredPosition?: SexualPreferenceEnum;

  @ApiPropertyOptional({
    description: 'Tribo',
    enum: TribeEnum,
    example: [TribeEnum.CUB, TribeEnum.CHUBBY],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(TribeEnum, { each: true })
  tribe?: TribeEnum[];

  @ApiPropertyOptional({
    description: 'Status de relacionamento',
    enum: RelationshipStatusEnum,
    example: RelationshipStatusEnum.SINGLE,
  })
  @IsOptional()
  @IsEnum(RelationshipStatusEnum)
  relationshipStatus?: RelationshipStatusEnum;
}
