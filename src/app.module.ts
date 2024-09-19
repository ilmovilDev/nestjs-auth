import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';

// Files config
import appConfig from './common/@config/app.config';
import dbConfig from './common/@config/db.config';
import jwtConfig from './common/@config/jwt.config';
import mailerConfig from './common/@config/mailer.config';
import swaggerConfig from './common/@config/swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        dbConfig,
        jwtConfig,
        mailerConfig,
        swaggerConfig
      ] 
    }),
    CommonModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
