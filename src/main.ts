import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', // ou sua URL do frontend
    credentials: true, // <- necessário para aceitar cookies
  });
  const config = new DocumentBuilder()
    .setTitle('Heat Me Up API')
    .setDescription('API para videochat com amigos e desconhecidos.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3001);
  console.log(`🚀 Backend rodando em http://localhost:3001`);
}
bootstrap();
