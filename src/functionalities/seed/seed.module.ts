import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../users/users.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    UsersModule,
    CommonModule
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
