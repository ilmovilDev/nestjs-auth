import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get('verify-email/:emailCode')
    verifyEmail(@Param('emailCode') emailCode: string ) {
      return this.usersService.verifyEmail(emailCode);
    }
    
}
