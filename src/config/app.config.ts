import { InternalServerErrorException } from "@nestjs/common";
import { registerAs } from "@nestjs/config";
import { AppConfig } from "./interface/app.config";

export default registerAs('app', (): AppConfig => {
    const requiredEnvVars = [
        'APP_PORT',
        'NODE_ENV',
        'DB_PORT',
        'DB_HOST',
        'DB_NAME',
        'DB_USER',
        'DB_PASSWORD',
        'SWAGGER_DOC_TITLE',
        'SWAGGER_DOC_DESCRIPTION',
        'SWAGGER_DOC_VERSION',
        'MAILER_APP',
        'MAILER_FROM',
        'MAILER_HOST',
        'MAILER_PORT',
        'MAILER_USER',
        'MAILER_PASSWORD',
        'BCRYPT_SALT_ROUNDS',
        'JWT_SECRET'
    ];

    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new InternalServerErrorException(`Missing environment variable: ${key}`);
        }
    });

    return {
        // APP
        app_port: Number(process.env.APP_PORT),
        node_env: process.env.NODE_ENV,

        // DATABASE
        db_port: Number(process.env.DB_PORT) || 5432,
        db_host: process.env.DB_HOST || 'localhost',
        db_name: process.env.DB_NAME || 'TestDB',
        db_user: process.env.DB_USER,
        db_password: process.env.DB_PASSWORD,

        // SWAGGER
        doc_title: process.env.SWAGGER_DOC_TITLE,
        doc_description: process.env.SWAGGER_DOC_DESCRIPTION,
        doc_version: process.env.SWAGGER_DOC_VERSION,

        // MAILER
        mailer_app: process.env.MAILER_APP,
        mailer_from: process.env.MAILER_FROM,
        mailer_host: process.env.MAILER_HOST,
        mailer_port: Number(process.env.MAILER_PORT),
        mailer_user: process.env.MAILER_USER,
        mailer_password: process.env.MAILER_PASSWORD,

        // BCRYPT
        bcrypt_salt: Number(process.env.BCRYPT_SALT_ROUNDS),

        // JSON WEB TOKEN
        jwt_secret: process.env.JWT_SECRET
    };

});
