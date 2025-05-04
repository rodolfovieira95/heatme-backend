import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
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
