import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow<string>('app.db_host'),
                port: configService.getOrThrow<number>('app.db_port'),
                database: configService.getOrThrow<string>('app.db_name'),
                username: configService.getOrThrow<string>('app.db_user'),
                password: configService.getOrThrow<string>('app.db_password'),
                autoLoadEntities: true,
                synchronize: true, // No usar en producción, solo en desarrollo
            })
        })
    ]
})
export class DatabaseModule {}
