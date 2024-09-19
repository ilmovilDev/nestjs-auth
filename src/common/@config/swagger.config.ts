import { registerAs } from "@nestjs/config"

export interface SwaggerConfig {
    doc_title: string;
    doc_description: string;
    doc_version: string;
}

export default registerAs ('swagger', (): SwaggerConfig => ({
    doc_title: process.env.SWAGGER_DOC_TITLE || 'NestJs Authentication',
    doc_description: process.env.SWAGGER_DOC_DESCRIPTION || 'The NestJs Authentication API',
    doc_version: process.env.SWAGGER_DOC_VERSION || '1.0',
}))