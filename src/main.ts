import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurações de segurança
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(cookieParser());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // limite de 100 requisições por windowMs
      message:
        'Muitas requisições deste IP, por favor tente novamente mais tarde',
    }),
  );

  // CORS mais restritivo
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  });

  // Documentação Swagger
  const config = new DocumentBuilder()
    .setTitle('Heat Me Up API')
    .setDescription('API para videochat com amigos e desconhecidos.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Autenticação', 'Endpoints de autenticação')
    .addTag('Usuários', 'Gerenciamento de usuários')
    .addTag('Amizades', 'Gerenciamento de amizades')
    .addTag('Mensagens', 'Gerenciamento de mensagens')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  // Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3001);
  console.log(`🚀 Backend rodando em http://localhost:3001`);
}
bootstrap();
