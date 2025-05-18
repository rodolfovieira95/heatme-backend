import { Controller, Get, Post, Patch, Body, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserProfile } from './entities/user-profile.entity';
import {
  BodyHairEnum,
  EyeColorEnum,
  GenderEnum,
  HairColorEnum,
  RelationshipStatusEnum,
  SexualPreferenceEnum,
  SkinColorEnum,
  TribeEnum,
} from './interfaces';

@ApiTags('Perfis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Obter perfil do usuário atual' })
  @ApiResponse({
    status: 200,
    description: 'Perfil encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
          description: 'ID único do perfil',
        },
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '123e4567-e89b-12d3-a456-426614174000',
              description: 'ID do usuário',
            },
            email: {
              type: 'string',
              example: 'usuario@exemplo.com',
              description: 'Email do usuário',
            },
            username: {
              type: 'string',
              example: 'usuario123',
              description: 'Nome de usuário',
            },
            isAnonymous: {
              type: 'boolean',
              example: false,
              description: 'Indica se o usuário é anônimo',
            },
            isPremium: {
              type: 'boolean',
              example: false,
              description: 'Indica se o usuário é premium',
            },
            socialProvider: {
              type: 'string',
              nullable: true,
              example: null,
              description: 'Provedor de autenticação social',
            },
            role: {
              type: 'string',
              enum: ['anonymous', 'user', 'premium', 'admin'],
              example: 'user',
              description: 'Papel do usuário no sistema',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-03-20T10:00:00.000Z',
              description: 'Data de criação do usuário',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-03-20T10:00:00.000Z',
              description: 'Data da última atualização do usuário',
            },
          },
        },
        avatarUrl: {
          type: 'string',
          example: 'https://example.com/avatar.jpg',
          description: 'URL do avatar do usuário',
          nullable: true,
        },
        displayName: {
          type: 'string',
          example: 'João Silva',
          description: 'Nome de exibição do usuário',
          nullable: true,
        },
        gender: {
          type: 'string',
          enum: [
            GenderEnum.MALE,
            GenderEnum.FEMALE,
            GenderEnum.NON_BINARY,
            GenderEnum.GENDERFLUID,
            GenderEnum.AGENDER,
            GenderEnum.TRANSGENDER_MALE,
            GenderEnum.TRANSGENDER_FEMALE,
            GenderEnum.INTERSEX,
            GenderEnum.TWO_SPIRIT,
            GenderEnum.OTHER,
            GenderEnum.PREFER_NOT_TO_SAY,
          ],
          example: GenderEnum.MALE,
          description: 'Gênero do usuário',
          nullable: true,
        },
        country: {
          type: 'string',
          example: 'Brasil',
          description: 'País do usuário',
          nullable: true,
        },
        city: {
          type: 'string',
          example: 'São Paulo',
          description: 'Cidade do usuário',
          nullable: true,
        },
        bio: {
          type: 'string',
          example: 'Olá, sou um desenvolvedor apaixonado por tecnologia!',
          description: 'Biografia do usuário',
          nullable: true,
        },
        tags: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['tecnologia', 'programação', 'música'],
          description: 'Tags associadas ao perfil',
        },
        age: {
          type: 'number',
          example: 25,
          description: 'Idade do usuário',
          nullable: true,
        },
        height: {
          type: 'number',
          example: 180,
          description: 'Altura do usuário em centímetros',
          nullable: true,
        },
        weight: {
          type: 'number',
          example: 75,
          description: 'Peso do usuário em quilogramas',
          nullable: true,
        },
        bodyHair: {
          type: 'string',
          enum: [
            BodyHairEnum.HAIRY,
            BodyHairEnum.TRIMMED,
            BodyHairEnum.SMOOTH,
            BodyHairEnum.WAXED,
            BodyHairEnum.SHAVED,
            BodyHairEnum.PARTIALLY_HAIRY,
          ],
          example: BodyHairEnum.SMOOTH,
          description: 'Pelos corporais',
          nullable: true,
        },
        skinColor: {
          type: 'string',
          enum: [
            SkinColorEnum.TYPE_1,
            SkinColorEnum.TYPE_2,
            SkinColorEnum.TYPE_3,
            SkinColorEnum.TYPE_4,
            SkinColorEnum.TYPE_5,
            SkinColorEnum.TYPE_6,
            SkinColorEnum.MIXED,
            SkinColorEnum.OTHER,
          ],
          example: SkinColorEnum.TYPE_1,
          description: 'Cor da pele',
          nullable: true,
        },
        hairColor: {
          type: 'string',
          enum: [
            HairColorEnum.BLONDE,
            HairColorEnum.BRUNETTE,
            HairColorEnum.LIGHT_BROWN,
            HairColorEnum.DARK_BROWN,
            HairColorEnum.BLACK,
            HairColorEnum.RED,
            HairColorEnum.AUBURN,
            HairColorEnum.GRAY,
            HairColorEnum.WHITE,
            HairColorEnum.BALD,
            HairColorEnum.DYED,
            HairColorEnum.OTHER,
          ],
          example: HairColorEnum.BLONDE,
          description: 'Cor do cabelo',
          nullable: true,
        },
        eyeColor: {
          type: 'string',
          enum: [
            EyeColorEnum.HONEY,
            EyeColorEnum.LIGHT_BROWN,
            EyeColorEnum.DARK_BROWN,
            EyeColorEnum.LIGHT_BLUE,
            EyeColorEnum.DARK_BLUE,
            EyeColorEnum.LIGHT_GREEN,
            EyeColorEnum.DARK_GREEN,
            EyeColorEnum.BLACK,
            EyeColorEnum.GRAY,
            EyeColorEnum.HAZEL,
            EyeColorEnum.AMBER,
            EyeColorEnum.HETEROCROMIA,
            EyeColorEnum.OTHER,
          ],
          example: EyeColorEnum.LIGHT_BROWN,
          description: 'Cor dos olhos',
          nullable: true,
        },
        preferredPosition: {
          type: 'string',
          enum: [
            SexualPreferenceEnum.TOP,
            SexualPreferenceEnum.BOTTOM,
            SexualPreferenceEnum.VERSATILE,
            SexualPreferenceEnum.VERSATILE_TOP,
            SexualPreferenceEnum.VERSATILE_BOTTOM,
            SexualPreferenceEnum.NO_PENETRATION,
          ],
          example: SexualPreferenceEnum.VERSATILE,
          description: 'Posição sexual preferida',
          nullable: true,
        },
        tribe: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              TribeEnum.TWINK,
              TribeEnum.BEAR,
              TribeEnum.CHUBBY,
              TribeEnum.CHASER,
              TribeEnum.DADDY,
              TribeEnum.JOCK,
              TribeEnum.DRAG,
              TribeEnum.OTTER,
              TribeEnum.GEEK,
              TribeEnum.LEATHER,
              TribeEnum.CUB,
              TribeEnum.CHUB,
              TribeEnum.TWUNK,
              TribeEnum.WOLF,
              TribeEnum.BUTCH,
              TribeEnum.FEMME,
              TribeEnum.ANDROGYNOUS,
              TribeEnum.TRANS,
              TribeEnum.QUEER,
              TribeEnum.NON_BINARY,
              TribeEnum.GENDERFLUID,
              TribeEnum.OTHER,
            ],
          },
          example: [TribeEnum.CUB, TribeEnum.CHUBBY],
          description: 'Tribos associadas ao usuário',
          nullable: true,
        },
        relationshipStatus: {
          type: 'string',
          enum: [
            RelationshipStatusEnum.SINGLE,
            RelationshipStatusEnum.MARRIED,
            RelationshipStatusEnum.OPEN_RELATIONSHIP,
            RelationshipStatusEnum.WIDOWED,
            RelationshipStatusEnum.DIVORCED,
            RelationshipStatusEnum.SEPARATED,
            RelationshipStatusEnum.COMPLICATED,
            RelationshipStatusEnum.POLYAMOROUS,
          ],
          example: RelationshipStatusEnum.SINGLE,
          description: 'Status de relacionamento',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil não encontrado',
  })
  @Get('me')
  getProfile(@CurrentUser() userPayload: { userId: string }) {
    return this.profilesService.findByUser(userPayload);
  }

  @ApiOperation({ summary: 'Criar novo perfil' })
  @ApiResponse({
    status: 201,
    description: 'Perfil criado com sucesso',
    type: UserProfile,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @Post()
  create(
    @CurrentUser() userPayload: { userId: string },
    @Body() dto: CreateUserProfileDto,
  ) {
    return this.profilesService.createOrUpdate(userPayload, dto);
  }

  @ApiOperation({ summary: 'Atualizar perfil existente' })
  @ApiResponse({
    status: 200,
    description: 'Perfil atualizado com sucesso',
    type: UserProfile,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil não encontrado',
  })
  @Patch()
  update(
    @CurrentUser() userPayload: { userId: string },
    @Body() dto: UpdateUserProfileDto,
  ) {
    return this.profilesService.createOrUpdate(userPayload, dto);
  }
}
