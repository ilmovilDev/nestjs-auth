import { registerAs } from "@nestjs/config";

interface DatabaseConfig {
    db_port: number
    db_host: string,
    db_name: string,
    db_user: string,
    db_password: string
}

export default registerAs('database', (): DatabaseConfig => ({
    db_port: Number(process.env.DB_PORT) || 5432,
    db_host: process.env.DB_HOST || 'localhost',
    db_name: process.env.DB_NAME || 'TestDB',
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD
}))