import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SeedModule, UsersModule]
})
export class FunctionalitiesModule {}
