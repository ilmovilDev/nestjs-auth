import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CommonModule } from 'src/common/common.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    MailerModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
