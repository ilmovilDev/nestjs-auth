import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HandleErrors } from 'src/common/@services/handle-errors.service';

@Injectable()
export class SeedService {

    constructor(
        private readonly usersService: UsersService,
        private readonly handleErrors: HandleErrors
    ){}

    async runSeed(): Promise<string> {
        await this.deleteTables();
        return 'SEED EXECUTED'
    }

    private async deleteTables(): Promise<void> {
        try {
            await this.usersService.deleteAllUser();
        } catch (error) {
            this.handleErrors.handleExceptions(error);
        }
    }
}
