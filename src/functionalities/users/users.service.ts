import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandleErrors } from 'src/common/@services/handle-errors.service';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly handleErrors: HandleErrors
    ){}

    async deleteAllUser (): Promise<void> {
        return await this.userRepository.clear()
    }
}
