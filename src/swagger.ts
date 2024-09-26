import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initializeSwagger(app: INestApplication): void {
    const configService = app.get(ConfigService);
    
    const config = new DocumentBuilder()
        .setTitle(configService.getOrThrow<string>('app.doc_title'))
        .setDescription(configService.getOrThrow<string>('app.doc_description'))
        .setVersion(configService.getOrThrow<string>('app.doc_version'))
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
}
