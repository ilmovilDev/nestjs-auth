import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly mailerService: MailerService,
    ){}

    async register(createUserDto: CreateUserDto){
        const user = await this.usersService.createUser(createUserDto);

        const verificationLink = `http://localhost:3000/api/v1/users/verify-email/${user.emailVerificationCode}`;

        // Send verification email
        await this.mailerService.sendEmail({
            recipients: [
                { name: user.username, address: user.email}
            ],
            subject: 'Email Verification',
            html: `
                <p>Hello, ${user.username}</p>
                <p>Thank you for registering on our platform. Please click the link below to verify your email address:</p>
                <a href="${verificationLink}">Verify your email</a>
                <p>Best regards,</p>
                <p>Your Company</p>
            `
        });

        return user;
        
    }
    
}
