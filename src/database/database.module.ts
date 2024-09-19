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
                host: configService.get<string>('database.db_host'),
                port: configService.get<number>('database.db_port'),
                database: configService.get<string>('database.db_name'),
                username: configService.get<string>('database.db_user'),
                password: configService.get<string>('database.db_password'),
                autoLoadEntities: true,
                synchronize: true
            })
        })
    ]
})
export class DatabaseModule {}
