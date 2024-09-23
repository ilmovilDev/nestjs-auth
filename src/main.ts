import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './common/@config/cors.config';
import { initializeSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig());

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  initializeSwagger(app)
  
  await app.listen(3000);
}
bootstrap();
