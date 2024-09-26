import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { FunctionalitiesModule } from './functionalities/functionalities.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig
      ] 
    }),
    CommonModule,
    DatabaseModule,
    FunctionalitiesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
