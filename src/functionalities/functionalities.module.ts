import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [UsersModule, AuthModule, MailerModule]
})
export class FunctionalitiesModule {}
