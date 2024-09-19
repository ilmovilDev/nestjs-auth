import { registerAs } from "@nestjs/config";

interface MailerConfig {
    mailer_host: string,
    mailer_port: number,
    mailer_secure: string,
    mailer_user: string,
    mailer_password: string,
}

export default registerAs('mailer', (): MailerConfig => ({
    mailer_host: process.env.MAILER_HOST || '',
    mailer_port: +process.env.MAILER_PORT,
    mailer_secure: process.env.MAILER_SECURE || '',
    mailer_user: process.env.MAILER_USER || '',
    mailer_password: process.env.MAILER_PASSWORD || '',
}))