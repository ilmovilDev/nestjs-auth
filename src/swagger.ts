import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './common/@config/swagger.config';

export function initializeSwagger(app: INestApplication): void {
    const configService = app.get(ConfigService);
    const swaggerConfig: SwaggerConfig = configService.getOrThrow('swagger');
    
    const config = new DocumentBuilder()
        .setTitle(swaggerConfig.doc_title)
        .setDescription(swaggerConfig.doc_description)
        .setVersion(swaggerConfig.doc_version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
}
