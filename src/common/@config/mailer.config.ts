import { registerAs } from "@nestjs/config";

interface MailerConfig {
    mailer_app: string,
    mailer_from: string,
    mailer_host: string,
    mailer_port: number,
    mailer_user: string,
    mailer_password: string,
}

export default registerAs('mailer', (): MailerConfig => ({
    mailer_app: process.env.MAILER_APP || '',
    mailer_from: process.env.MAILER_FROM || '',
    mailer_host: process.env.MAILER_HOST || '',
    mailer_port: +process.env.MAILER_PORT,
    mailer_user: process.env.MAILER_USER || '',
    mailer_password: process.env.MAILER_PASSWORD || '',
}))