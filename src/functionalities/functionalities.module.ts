import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [SeedModule, UsersModule, RolesModule]
})
export class FunctionalitiesModule {}
