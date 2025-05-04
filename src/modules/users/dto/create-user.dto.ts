import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsEnum,
  IsArray,
} from 'class-validator';
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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Nome de usuário',
    example: 'johndoe',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6,
  })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    description: 'Provedor de autenticação social',
    enum: SocialProviderEnum,
    example: SocialProviderEnum.GOOGLE,
  })
  @IsOptional()
  @IsEnum(SocialProviderEnum)
  socialProvider?: SocialProviderEnum;

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
