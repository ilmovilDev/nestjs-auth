import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './common/@config/cors.config';
import { initializeSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig());

  initializeSwagger(app)
  
  await app.listen(3000);
}
bootstrap();
