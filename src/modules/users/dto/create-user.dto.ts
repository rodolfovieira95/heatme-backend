import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { SocialProviderEnum, UserRole } from '../interfaces';
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

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
