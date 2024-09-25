import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmail } from './@types/send-email';
import { HandleErrors } from 'src/common/@services/handle-errors.service';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {

    constructor(
        private readonly configService: ConfigService,
        private readonly handleErrors: HandleErrors
    ){}

    mailTransport() {

        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('mailer.mailer_host'),
            port: this.configService.get<number>('mailer.mailer_port'),
            secure: false, // true for port 465, false for other ports
            auth: {
              user: this.configService.get<string>('mailer.mailer_user'),
              pass: this.configService.get<string>('mailer.mailer_password'),
            },
        });

        return transporter;

    }

    async sendEmail(sendEmail: SendEmail) {

        const { from, recipients, subject, html } = sendEmail
    
        const transport = this.mailTransport();

        const options: Mail.Options = {
            from: from ?? {
                name: this.configService.get<string>('mailer.mailer_app'),
                address: this.configService.get<string>('mailer.mailer_from')
            },
            to: recipients,
            subject,
            html
        }

        try {
            const result = await transport.sendMail(options);
            return result;
        } catch (error) {
            this.handleErrors.handleExceptions(error);
        }
    }

}
